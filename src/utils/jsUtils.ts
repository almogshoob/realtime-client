type ReducerProps<T, U> = {
  list: T[];
  filterBefore?: (item: T) => boolean;
  map: (item: T) => U;
  filterAfter?: (item: U) => boolean;
  direction: "left" | "right";
};

export const reducer = <T, U>({
  list,
  filterBefore,
  map,
  filterAfter,
  direction = "left",
}: ReducerProps<T, U>): U[] => {
  return (direction === "left" ? list.reduce : list.reduceRight)(
    (list: U[], item: T) => {
      if (!filterBefore || filterBefore(item)) {
        const mappedItem = map(item);
        if (!filterAfter || filterAfter(mappedItem)) list.push(mappedItem);
      }
      return list;
    },
    []
  );
};
