<script setup lang="ts">
  import type { Book } from '@/types/books';
  import { useRouter } from 'vue-router';

  import useBooks from '@/stores/books';
  import useAuth from '@/stores/auth';
  import BookCover from './BookCover.vue';
  import BookIcon from './icons/BookIcon.vue';
  import CancelButton from './buttons/CancelButton.vue';

  defineProps<{
    book: Book;
  }>();

  const books = useBooks();
  const auth = useAuth();
  const router = useRouter();

  const checkAuth = () => {
    if (auth.loggedOut) {
      router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
      return false;
    }
    return true;
  };

  const order = (bookId: int) => {
    if (checkAuth()) {
      books.order(bookId);
    }
  };

  const orderCancel = (bookId: int) => {
    if (checkAuth()) {
      books.orderCancel(bookId);
    }
  };
</script>

<template>
  <div class="flex">
    <aside class="mr-10">
      <BookCover class="mb-4" :imageSrc="book.coverImageUrl">
        <template #icon>
          <BookIcon style="font-size: 25px; opacity: 0.8" />
        </template>
      </BookCover>
      <div>
        Status:
        <em v-if="book.isAvailable">On shelf</em>
        <em v-else-if="book.isReserved">Reserved</em>
        <em v-else-if="book.isIssued">
          <span>Issued until: {{ book.reservationTerm }}</span>
        </em>
      </div>

      <button
        v-if="books.bookReservable"
        :disabled="book.maxReservationsReached"
        @click="order(book.id)"
        class="transition-background-color mr-2 mt-2 rounded bg-primary-400 p-3 text-white enabled:hover:bg-primary-300 disabled:opacity-75">
        <span v-if="!book.isAvailable">Queue up</span>
        <span v-else>Reserve</span>
      </button>
      <span v-if="book.maxReservationsReached && !books.reservedByMember" class="block text-xs">
        Maximum reserations reached
      </span>
      <CancelButton
        v-if="books.reservedByMember || books.queuedByMember"
        @click="orderCancel(book.id)">
        Cancel reservation
      </CancelButton>
    </aside>

    <section>
      <h1 class="mb-4">{{ book.title }}</h1>
      <table class="table-auto text-lg">
        <tr>
          <td>Author</td>
          <td>
            {{ book.author.lastName }}, {{ book.author.firstName }}
            <span v-if="book.author.yearOfBirth">
              {{ book.author.yearOfBirth }} - {{ book.author.yearOfBirth }}
            </span>
          </td>
        </tr>
        <tr>
          <td>Publisher</td>
          <td>{{ book.publisher.name }}</td>
        </tr>
        <tr>
          <td>Published at</td>
          <td>{{ book.publishedAt }}</td>
        </tr>
        <tr>
          <td>Pages</td>
          <td>{{ book.pages }} {{ book.pagesDescription }}</td>
        </tr>
        <tr>
          <td>Language</td>
          <td>{{ book.language }}</td>
        </tr>
        <tr>
          <td>ISBN</td>
          <td>{{ book.isbn }}</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<style scoped>
  table {
    td {
      padding: 5px 15px;
    }
    tr:nth-of-type(odd) {
      background-color: rgb(var(--surface-200));
    }
  }

  aside {
    width: 220px;
  }

  .book-cover {
    height: 300px;
  }
</style>
