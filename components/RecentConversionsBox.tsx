import useSWRInfinite from "swr/infinite";

const fetcher = (input: RequestInfo, init: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export default function RecentConversionsBox() {
  const getKey = (pageIndex, prevPageData) => {
    if (prevPageData && prevPageData.conversions.length < 3) {
      return null;
    }
    return `/api/getRecentConversions?limit=3&page=${pageIndex}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  const reachedEnd = data && data[data.length - 1].conversions.length < 3;

  return (
    <section>
      <h2 className="font-medium text-center mb-2">
        Recently Converted Projects
      </h2>
      <ul className="space-y-2">
        {data &&
          data
            .flatMap(({ conversions }) => conversions) // Concatenate pages into a single array
            .map((conversion) => (
              <li
                key={conversion.id}
                className="flex space-x-2 bg-gray-200 rounded-md p-2"
              >
                <a
                  href={`https://scratch.mit.edu/projects/${conversion.scratchProjectId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="h-12 rounded"
                    src={conversion.scratchProjectData.image}
                    alt={conversion.scratchProjectData.title}
                  />
                </a>
                <div className="flex-grow">
                  <div className="flex">
                    <div className="flex-1">
                      <a
                        className="font-medium hover:underline"
                        href={`https://scratch.mit.edu/projects/${conversion.scratchProjectId}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {conversion.scratchProjectData.title}
                      </a>{" "}
                      by{" "}
                      <a
                        className="hover:underline"
                        href={`https://scratch.mit.edu/users/${conversion.scratchProjectData.author.username}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {conversion.scratchProjectData.author.username}
                      </a>
                    </div>
                    <div className="flex-initial text-xs text-gray-600">
                      {getTimeAgo(new Date(conversion.createdAt))}
                    </div>
                  </div>
                  <div>
                    <a
                      className="inline-block text-indigo-700 hover:underline"
                      href={`https://codesandbox.io/s/${conversion.sandboxId}?file=/index.js`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View as JavaScript
                    </a>
                  </div>
                </div>
              </li>
            ))}
        {!data &&
          new Array(3).fill(null).map((_, index) => (
            <li
              key={index}
              className="flex space-x-2 bg-gray-200 rounded-xl p-2"
            >
              <a>
                <div className="w-16 h-12 rounded-lg bg-gray-400" />
              </a>
              <div>
                <div>
                  <a className="font-medium text-transparent bg-gray-400 rounded">
                    Loading loading loading
                  </a>{" "}
                  <a className="text-transparent bg-gray-300 rounded">
                    Loading loading
                  </a>
                </div>
                <div>
                  <a className="inline-block bg-indigo-100 rounded text-transparent">
                    View as JavaScript
                  </a>
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="text-center mt-2">
        {!reachedEnd && (
          <button
            className="text-indigo-600 hover:underline px-4 py-2 rounded"
            onClick={() => setSize(size + 1)}
          >
            Load more...
          </button>
        )}
        {reachedEnd && (
          <div className="italic text-gray-700 mt-4">
            You've reached the end of the list
          </div>
        )}
      </div>
    </section>
  );
}

function getTimeAgo(date: Date) {
  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const YEAR = DAY * 365;

  const secondsAgo = Math.round((Date.now() - date.getTime()) / 1000);

  if (secondsAgo < MINUTE) {
    return `${secondsAgo}s ago`;
  } else if (secondsAgo < HOUR) {
    return `${Math.floor(secondsAgo / MINUTE)}m ago`;
  } else if (secondsAgo < DAY) {
    return `${Math.floor(secondsAgo / HOUR)}h ago`;
  } else if (secondsAgo < YEAR) {
    return date.toLocaleString("default", { day: "numeric", month: "short" });
  } else {
    return date.toLocaleString("default", { year: "numeric", month: "short" });
  }
}
