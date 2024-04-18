import {
  defineBuiltinElement,
  generateId,
  createElement,
  sx,
} from "@eofol/eofol";

function defineInfiniteScroll<T>({
  items,
  render,
  loadMore,
  hasMore,
  pageStart,
  pageSize,
}: {
  items: T[];
  render: (item: T) => Element;
  loadMore: () => T[];
  hasMore: () => boolean;
  pageStart?: number;
  pageSize?: number;
}) {
  defineBuiltinElement({
    tagName: "infinite-scroll",
    render: (state, setState) => {
      // @ts-ignore
      const page = state.page;
      // @ts-ignore
      const hasMoreItems = state.hasMore;

      let observer: IntersectionObserver;
      let lastElementId: string;

      if (hasMoreItems) {
        lastElementId = generateId();
        const observerCallback = (entries: any) => {
          entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
              const more = loadMore();
              // @ts-ignore
              setState({ hasMore: hasMore(), page: [...page, ...more] });
            }
          });
        };
        observer = new IntersectionObserver(observerCallback);
      }

      const lastElement = createElement(
        "div",
        sx({ height: "10px" }),
        undefined,
        // @ts-ignore
        hasMoreItems ? { id: lastElementId } : {}
      );
      if (hasMoreItems) {
        // @ts-ignore
        observer.observe(lastElement);
      }

      return [...page.map(render), lastElement];
    },
    initialState: {
      page: items.filter(
        (item, index) => index >= (pageStart ?? 0) && index <= (pageSize ?? 10)
      ),
      hasMore: true,
    },
  });
}

export default defineInfiniteScroll;
