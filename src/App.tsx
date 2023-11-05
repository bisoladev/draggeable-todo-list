import { useEffect, useState } from 'react';
import { moon, sun } from './icons';
import List from './ListComponent';

type ListItem = {
  id: number;
  title: string;
  done: boolean;
};

const getLocalStorage = (): ListItem[] => {
  const listJSON = localStorage.getItem('list');
  const list = listJSON ? JSON.parse(listJSON) : [];
  return list;
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Initialize the counter for generating numeric ids
  const [idCounter, setIdCounter] = useState<number>(list.length);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check for system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // Check for manual preference
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If the user passes in an empty string
    if (!name || name.trim().length === 0) {
      // display alert
      // eslint-disable-next-line no-console
      console.log('ddd');
    } else {
      const newItem = {
        id: idCounter,
        title: name,
        done: false,
      };
      // Increment the idCounter for the next item
      setIdCounter(idCounter + 1);

      setList([...list, newItem]);
      setName('');
    }
  };

  const clearList = () => {
    setList([]);
  };

  const removeItem = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const toggleItemDone = (
    _event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setList(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList)); // Update local storage
  };

  const activeTasksCount = list.filter((item) => !item.done).length;
  const completedTasksCount = list.filter((item) => item.done).length;

  return (
    <div className="h-screen w-full bg-light bg-contain bg-no-repeat text-xs transition dark:bg-bgDark dark:bg-dark max-[768px]:bg-[length:auto_200px] md:text-lg">
      <div className="mx-auto h-5/6 w-11/12 sm:w-8/12 lg:w-5/12">
        <div className="flex justify-between py-20">
          <img src="/img/todo.png" alt="Todo" />
          <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? sun : moon}
          </button>
        </div>
        <form
          className="card-shadow mb-7 flex justify-between rounded bg-white px-4 py-5 text-darkColor dark:bg-cardBgDark dark:text-lightColor"
          onSubmit={handleSubmit}
        >
          <div className="h-6 w-6 rounded-full border border-solid border-[#E3E4F1] dark:border-darkColor" />
          <input
            type="text"
            placeholder="Create a new todo..."
            className="w-full border-none bg-transparent px-5 focus:outline-none dark:placeholder:text-[#767992]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </form>
        <div
          className={`${
            list.length !== 0 ? 'opacity-100' : 'opacity-0'
          } card-shadow rounded bg-bgLight transition-opacity dark:bg-cardBgDark`}
        >
          <List
            items={list}
            removeItem={removeItem}
            toggleItemDone={toggleItemDone}
            filter={filter}
          />
          <div className="">
            <div className="flex justify-between px-5 py-4 text-sm font-normal text-[#9495A5] dark:text-[#5B5E7E]">
              {filter === 'all' || filter === 'active' ? (
                <p>{activeTasksCount ?? 0} items left</p>
              ) : (
                <p>{completedTasksCount ?? 0} items done</p>
              )}

              <div className="hidden sm:inline-block">
                <button
                  type="button"
                  className={`${
                    filter === 'all'
                      ? 'text-activeText'
                      : 'category-btn text-[#9495A5] dark:text-[#5B5E7E]'
                  } remove-highlight`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`${
                    filter === 'active'
                      ? 'text-activeText'
                      : 'category-btn text-[#9495A5] dark:text-[#5B5E7E]'
                  } remove-highlight px-5`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`${
                    filter === 'completed'
                      ? 'text-activeText'
                      : 'category-btn text-[#9495A5] dark:text-[#5B5E7E]'
                  } remove-highlight`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="remove-highlight font-normal hover:text-[#494C6B] dark:hover:text-[#E3E4F1]"
                  onClick={clearList}
                >
                  Clear List
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            list.length !== 0 ? 'opacity-100' : 'opacity-0'
          } card-shadow mt-4 flex justify-center rounded bg-bgLight py-4 font-semibold dark:bg-cardBgDark sm:hidden`}
        >
          <button
            type="button"
            className={`${
              filter === 'all'
                ? 'text-activeText'
                : 'category-btn text-[#9495A5] dark:text-[#5B5E7E]'
            } remove-highlight`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`${
              filter === 'active'
                ? 'text-activeText'
                : 'category-btn text-[#9495A5] dark:text-[#5B5E7E]'
            } remove-highlight px-5`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`${
              filter === 'completed'
                ? 'text-activeText'
                : 'category-btn text-[#9495A5] dark:text-[#5B5E7E]'
            } remove-highlight`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <p
        className={`${
          list.length !== 0 ? 'opacity-100' : 'opacity-0'
        } text-center text-sm text-grey dark:text-darkNote`}
      >
        Drag and drop to reorder list
      </p>
    </div>
  );
}

export default App;
