import { useEffect, useState } from "react";
import { fuse, IDictionary } from "../utils/fuse";
import Fuse from "fuse.js";
import Image from "next/image";

const IndexPage = () => {
  const [results, setResults] = useState<Fuse.FuseResult<IDictionary>[]>([]);
  const [search, setSearch] = useState("");

  /**
   * Automatic search with a bit of delay
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("setstate");
      if (search.length < 1) return;

      const fuseResults = fuse.search(search);
      setResults(fuseResults);
    }, 100);
    return () => {
      clearTimeout(timer);
      console.log("cleared");
    };
  }, [search]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl w-full mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">FMF Slovar</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              v slovenščini ali angleščini
            </label>
            <div className="mt-1 relative flex items-center">
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                className="shadow-sm p-2 w-full sm:w-96 focus:ring-indigo-500 focus:border-indigo-500 block pr-12 sm:text-sm border-gray-300 border rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Fuse results */}
        {results.length > 0 ? (
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden sm:w-96 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Slovensko
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Angleško
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {results.map((value, index) => (
                        <tr key={value.refIndex}>
                          <td className="text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {value.item.slovene}
                          </td>
                          <td className="text-right px-3 py-4 text-sm text-gray-500">
                            {value.item.english}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-col justify-center gap-4 pb-8 text-sm fixed bottom-0">
            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              Cel slovar
            </button>
            <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
              Predlagaj besede{" "}
              <Image
                className="pl-1"
                src={"/icons/github.svg"}
                height={16}
                width={20}
              />
            </button>
          </div>
        )}

        {/*  */}
      </div>
    </div>
  );
};

export default IndexPage;
