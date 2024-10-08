<script setup lang="ts">
  import BookCover from '@/components/BookCover.vue';
  import CancelButton from '@/components/buttons/CancelButton.vue';
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
  import BookIcon from '@/components/icons/BookIcon.vue';
  import useBook from '@/stores/book';
  import type { Book } from '@/types/books';

  defineProps<{
    book: Book;
    orderProcessing: boolean;
    onOrder: (_bookId: number) => void;
    onOrderCancel: (_bookId: number) => void;
  }>();

  const bookStore = useBook();
</script>

<template>
  <div class="flex flex-wrap max-md:justify-center max-sm:text-center">
    <aside class="max-sm:mb-8 sm:mr-10">
      <BookCover class="mb-4" :imageSrc="book.coverImageUrl">
        <template #icon>
          <BookIcon style="font-size: 25px; opacity: 0.8" />
        </template>
      </BookCover>
      <div>
        <div>
          <em v-if="book.isAvailable">On shelf</em>
          <em v-else-if="book.isReservedByMember">Reserved by you</em>
          <em v-else-if="book.isIssued">
            <span v-if="book.isIssuedToMember">
              Issued to you until: <br />
              {{ book.reservationTerm }}
            </span>
            <span v-else>
              Issued to reader until: <br />
              {{ book.reservationTerm }} <br />
            </span>
          </em>
          <em v-else-if="book.isEnqueuedByMember">Enqueued by you</em>
          <em v-else-if="book.isReserved">Reserved</em>
        </div>
        <span v-if="!book.isIssuedToMember && book.amountInQueue"
          >Amount in queue: {{ book.amountInQueue }}
        </span>
      </div>

      <PrimaryButton
        v-if="bookStore.reservable"
        :disabled="
          book.isMaxReservationsReached || book.isMaxEnqueuedOrdersReached || orderProcessing
        "
        @click="onOrder(book.id)"
        class="transition-background-color mr-2 mt-2 rounded bg-primary-400 p-3 text-white enabled:hover:bg-primary-300 disabled:opacity-75">
        <span v-if="bookStore.queuable">Queue up</span>
        <span v-else>Reserve</span>
      </PrimaryButton>
      <span v-if="book.isMaxReservationsReached && !bookStore.bookedByMember" class="block text-xs">
        Maximum reservations reached
      </span>
      <span
        v-if="book.isMaxEnqueuedOrdersReached && !bookStore.bookedByMember"
        class="block text-xs">
        Maximum reservations in queue reached
      </span>
      <CancelButton
        v-if="book.isReservedByMember || book.isEnqueuedByMember"
        :disabled="orderProcessing"
        @click="onOrderCancel(book.id)">
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
