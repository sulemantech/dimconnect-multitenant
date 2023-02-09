import PageProvider from "../../../providers/PageProvider"
import CostInfo from "./CostInfo"
import MaterialsInfo from "./MaterialsInfo"

const Dashboard = () => {
  return (

    <PageProvider>

      <div className="flex">
        <div className="flex-[2]">
          <div className="flex  flex-1">
            <div className="flex-[2] min-h-[300px] h-full m-1 bg-white shadow-lg p-2 rounded-xl ">
            <p className="flex-grow font-thin text-neutral-700 text-lg">
                Cost Info
              </p>
              <hr />
              <MaterialsInfo />
            </div>


          </div>
          <div className="flex flex-1">
            <div className="flex-[1] min-h-[300px] m-1 bg-white shadow-lg p-2 rounded-xl ">
              <p className="flex-grow font-thin text-neutral-700 text-lg">
                Cost Info
              </p>
              <hr />
              {/* <MaterialsInfo /> */}
            </div>
            <div className="flex-1  m-1 bg-white shadow-lg p-2 rounded-xl ">
            <p className="flex-grow font-thin text-neutral-700 text-lg">
                Cost Info
              </p>
              <hr />
              {/* <CostInfo /> */}
            </div>
          </div>
        </div>
        <div className="flex-[1] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
        <p className="flex-grow font-thin text-neutral-700 text-lg">
                Cost Info
              </p>
              <hr />


        </div>
      </div>

    </PageProvider>

  )
}

export default Dashboard