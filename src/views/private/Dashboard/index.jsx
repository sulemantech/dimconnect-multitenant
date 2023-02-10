import PageProvider from "../../../providers/PageProvider"
// import CostInfo from "./CostInfo"
import MaterialsInfo from "./MaterialsInfo"

const Dashboard = () => {
  return (

    <PageProvider>
      <div className="flex">
        <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
          <p className="flex-grow font-thin text-neutral-700 text-lg">
            Demand Points
          </p>
          <hr />
          <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
            <b>
            100
          </b>
          </div>
        </div>
        <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
          <p className="flex-grow font-thin text-neutral-700 text-lg">
            Feeder Cables
          </p>
          <hr />
          <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
            <b>
            200
          </b>
          </div>
        </div>
        <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
          <p className="flex-grow font-thin text-neutral-700 text-lg">
            Distribution Cables
          </p>
          <hr />
          <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
            <b>
            100
          </b>
          </div>
        </div>
        <div className="flex-[1] min-h-[100px] m-1 bg-white shadow-lg p-2 rounded-xl flex-grow">
          <p className="flex-grow font-thin text-neutral-700 text-lg">
            Total Splitters
          </p>
          <hr />
          <div className="flex justify-center items-center text-4xl font-light text-[#0071b9]">
            <b>
            100
          </b>
          </div>
        </div>

      </div>
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