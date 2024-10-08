<script setup lang="ts">
  import BookCover from './BookCover.vue';
  import CancelButton from './buttons/CancelButton.vue';
  import PrimaryButton from './buttons/PrimaryButton.vue';

  import type { BookEnqueued, BookInList, BookReserved } from '@/types/books';

  defineProps<{
    books: BookInList[] | BookReserved[] | BookEnqueued[];
    onReservationExtend?: (_bookId: number) => Promise<void>;
    onReservationExtendCancel?: (_bookId: number) => Promise<void>;
    extensionProcessing?: boolean;
  }>();
</script>

<template>
  <ul
    class="justify-space-around m-auto flex flex-wrap max-md:justify-center md:w-2/3"
    style="gap: 20px">
    <li v-for="book in books" :key="book.id" class="book-item">
      <RouterLink class="w-full book-link" :to="{ name: 'book', params: { id: book.id } }">
        <BookCover :imageSrc="book.coverImageUrl" />
        <h3 class="mt-2 font-semibold">{{ book.title }}</h3>
      </RouterLink>
      <span v-if="book.author">{{ book.author.lastName }}, {{ book.author.firstName }}</span>
      <div class="mt-2">
        <em v-if="book.reservationTerm">
          <span v-if="book.reservationId">
            Issued to you until: <br />
            {{ book.reservationTerm }}
            <PrimaryButton
              v-if="book.reservationExtendable"
              :disabled="extensionProcessing"
              @click="onReservationExtend && onReservationExtend(book.id)">
              Extend reservation
            </PrimaryButton>
            <CancelButton
              v-if="book.hasRequestedExtension"
              :disabled="extensionProcessing"
              @click="onReservationExtendCancel && onReservationExtendCancel(book.id)">
              Revoke extension
            </CancelButton>
          </span>
          <span v-else>
            Issued to reader until: <br />
            {{ book.reservationTerm }}
          </span>
          <br />
        </em>
        <em v-if="book.reservationId" class="text-sm font-semibold">
          Reservation ID: {{ book.reservationId }}
        </em>
        <em v-else-if="!book.reservationId && book.amountInQueue" class="text-sm font-semibold">
          Amount in queue: {{ book.amountInQueue }}
        </em>
      </div>
    </li>
  </ul>
</template>

<style scoped>
  .book-item {
    width: 160px;

    .book-link:hover .book-cover {
      &.no-cover {
        background-color: rgb(var(--primary-400));
      }

      &.has-cover {
        opacity: 0.8;
      }
    }
  }
</style>
