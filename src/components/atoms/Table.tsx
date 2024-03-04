import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../../store";
import { formatDate } from "../../../utils/helper/formatDate";
import RefreshButton from "./RefreshButton";
import { formatCurrency } from "../../../utils/helper/formatCurrency";

const Table = () => {
  const { listCrypto, errors } = useStore();
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const data = listCrypto?.data;
  // console.log(listCrypto, "<<<<");

  function handleNext() {
    navigate(`/page/${Number(pageNumber) + 1}`)
  }
  function handlePrev() {
    if (Number(pageNumber) === 1) return
    navigate(`/page/${Number(pageNumber) - 1}`)
  }

  return (
    <div className="pb-40 md:pb-1">
      <div className="flex items-center justify-start px-4 mx-auto mt-5 text-xl sm:px-8">
        <RefreshButton />
      </div>
      <div className="container w-full h-full px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal drop-shadow-md">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Coin
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      1H%
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      24H%
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      7D%
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      ATH
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      ATH Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Market Cap
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Total Volume
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-bold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Circulating Supply
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.map((el: any, idx: number) => {
                      return (
                        <tr className="cursor-pointer" key={idx} onClick={() => navigate(`/${el.id}`)}>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {el.market_cap_rank}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="#" className="relative block">
                                  <img
                                    alt="profil"
                                    src={el.image}
                                    className="object-cover w-10 h-10 mx-auto rounded-full "
                                  />
                                </a>
                              </div>
                              <div className="ml-3">
                                <p className="font-bold text-gray-900 whitespace-no-wrap">
                                  {el.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatCurrency(el.current_price)}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className={`${el?.price_change_percentage_1h_in_currency?.toString().startsWith('-') ? 'text-red-500' : 'text-green-500'} whitespace-no-wrap`}>
                              {el?.price_change_percentage_1h_in_currency?.toFixed(1)}%
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className={`${el?.price_change_percentage_24h_in_currency?.toString().startsWith('-') ? 'text-red-500' : 'text-green-500'} whitespace-no-wrap`}>
                              {el?.price_change_percentage_24h_in_currency?.toFixed(1)}%
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className={`${el?.price_change_percentage_7d_in_currency?.toString().startsWith('-') ? 'text-red-500' : 'text-green-500'} whitespace-no-wrap`}>
                              {el?.price_change_percentage_7d_in_currency?.toFixed(1)}%
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatCurrency(el.ath)}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatDate(el.ath_date)}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatCurrency(el.market_cap)}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatCurrency(el.total_volume)}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {el.circulating_supply} {el.symbol.toUpperCase()}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="flex items-center justify-center gap-2 px-5 py-5 bg-white">
                <button className={`rounded-2xl border-2 border-dashed border-black bg-white p-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none ${pageNumber == 1 ? 'hidden' : ''}`} onClick={handlePrev}>Prev</button>
                <button className="rounded-2xl border-2 border-dashed border-black bg-white p-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none" onClick={handleNext}>Next</button>
              </div>
            </div>
            {errors && (
              <span className="flex items-center justify-center text-red-500">
                {errors.response.request.statusText} Wait a Few Minutes and
                Refresh
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
