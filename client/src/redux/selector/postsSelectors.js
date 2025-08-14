import { createSelector } from '@reduxjs/toolkit';

// 1) Простой селектор — берёт «сырые» посты из state
//    (каждый раз возвращает ссылку на state.posts.items)
export const selectPostsItems = state => state.posts.items;

// 2) Мемоизированный селектор, который:
//    • в качестве входа берёт output selectPostsItems,
//    • вычисляет список ID через map,
//    • запоминает этот результат и выдаёт его **без пересчёта**,
//      если state.posts.items не изменился по ссылке.
export const selectPostsIds = createSelector(
  [selectPostsItems],         // входные селекторы
  items => {                  // выходная функция
    // здесь мы берём каждый пост и вытаскиваем только его _id
    return items.map(item => item._id);
  }
);