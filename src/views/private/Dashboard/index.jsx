import PageProvider from "../../../providers/PageProvider"
import MaterialCount from "./MaterialCount"
// import CostInfo from "./CostInfo"
import MaterialsInfo from "./MaterialsInfo"
import Submap from "./Submap"
import Tickets from "./Tickets"

const Dashboard = () => {
  return (

    <PageProvider>
      <div className="flex flex-col md:flex-row">
        <MaterialCount />

      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-[2]">
          <div className="flex flex-col md:flex-row flex-1">
            <div className="flex-[2] min-h-[300px] h-full m-1 bg-white shadow-lg p-2 rounded-xl ">
              <p className="flex-grow font-thin text-neutral-700 text-lg">
                Cost Info
              </p>
              <hr />
              <MaterialsInfo />
            </div>


          </div>
          <div className="flex flex-col md:flex-row flex-1">
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
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row">
            <div className="flex-[1] relative m-1 w-[400px] h-[400px] bg-white shadow-lg p-2 rounded-xl">
              <p className="flex-grow font-thin text-neutral-700 text-lg">
                Map
              </p>
              <hr />
              <Submap />
              
            </div>
            <div className="flex-[1] m-1 min-h[100%] flex-grow bg-white shadow-lg p-2 rounded-xl">
              <Tickets />
              </div>
          </div>
          <div className="flex-[1] m-1 min-h[100%] flex-grow bg-white shadow-lg p-2 rounded-xl">
            <p className="flex-grow font-thin text-neutral-700 text-lg">
              Side Details
            </p>
            <hr />


          </div>

        </div>

      </div>

    </PageProvider>

  )
}

export default Dashboard