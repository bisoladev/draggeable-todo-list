type ListItem = {
  id: string;
  title: string;
  done: boolean;
};

type ListProps = {
  items: ListItem[];
  removeItem: (id: string) => void;
  toggleItemDone: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  filter: 'all' | 'active' | 'completed';
};
function List({ items, removeItem, toggleItemDone, filter }: ListProps) {
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !item.done;
    if (filter === 'completed') return item.done;
    return false;
  });
  return (
    <div className="max-h-[390px] overflow-y-scroll md:max-h-[414px]">
      {filteredItems.map((item) => {
        const { id, title, done } = item;

        return (
          <article className="" key={id}>
            <div className="flex justify-between border-b border-solid border-[#E3E4F1] p-5 dark:border-[#393A4B]">
              <div className="flex">
                <button
                  type="button"
                  onClick={(e) => toggleItemDone(e, id)}
                  className="remove-highlight"
                >
                  {done ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="11.5"
                        fill="white"
                        stroke="#E3E4F1"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="url(#paint0_linear_0_267)"
                      />
                      <path
                        d="M8 12.3041L10.6959 15L16.6959 9"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_0_267"
                          x1="-12"
                          y1="12"
                          x2="12"
                          y2="36"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#55DDFF" />
                          <stop offset="1" stopColor="#C058F3" />
                        </linearGradient>
                      </defs>
                    </svg>
                  ) : (
                    <div className="hover:gradient-border h-6 w-6 rounded-full border border-solid border-[#E3E4F1] dark:border-darkColor" />
                  )}
                </button>
                <div className="w-full px-5 ">
                  <p
                    className={`${
                      done
                        ? 'text-[#D1D2DA] line-through dark:text-[#4D5067]'
                        : 'text-[#494C6B] dark:text-[#C8CBE7]'
                    } `}
                  >
                    {title}
                  </p>
                </div>
              </div>

              <button type="button" onClick={() => removeItem(id)}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z"
                    fill="#5B5E7E"
                  />
                </svg>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
