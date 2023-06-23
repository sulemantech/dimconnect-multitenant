import { Suspense, lazy } from "preact/compat"
import PageProvider from "../../../../providers/PageProvider"
import { Badge, Skeleton } from "@mantine/core"
import MapElements from "./MapElements"
import PermissionWrapper from "../../../../providers/PermissionsProvider"
import { PERMISSIONS } from "../../../../common"

const MaterialCount = lazy(() => import("./MaterialCount"))
const CostInfo = lazy(() => import("./CostInfo"))
const CostInfoChart = lazy(() => import("./CostInfoChart"))
const Submap = lazy(() => import("./Submap"))
const Tickets = lazy(() => import("./Tickets"))

const Dashboard = () => {
  
  return (
    <PermissionWrapper permission={PERMISSIONS.Dashboard} view>
      <PageProvider>

        <div className="flex flex-col md:flex-row">
          <Suspense fallback={<Skeleton />}>
            <MaterialCount />
          </Suspense>
          <div className="flex-[1] min-h[100%] flex-grow p-1 rounded-xl">
                
                <Suspense fallback={<Skeleton />}>
                  <MapElements />
                </Suspense>
              </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-[2]">
            <div className="flex flex-col md:flex-row flex-1">
              <div className="flex-[2] min-h-[300px] h-full m-1 bg-white shadow-lg rounded-xl ">
                
                <Suspense fallback={<Skeleton />}>
                  <CostInfo />

                </Suspense>
              </div>
              

            </div>
            <div className="flex flex-col md:flex-row flex-1">
              <div className="flex-[1] min-h-[300px] m-1 bg-white shadow-lg p-2 rounded-xl ">

                <Suspense fallback={<Skeleton />}>
                  <CostInfoChart />
                </Suspense>
              </div>

            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row">
              <div className="flex-[1] relative m-1 w-[400px] h-[400px] bg-white shadow-lg p-2 justify-right rounded-xl">

                <Suspense fallback={<Skeleton />}>
                  <Submap />
                </Suspense>
                <hr />
                <Badge color="blue" variant="outline" size="xs" className="mb-1">
                  Click on the map to enlarge
                </Badge>

              </div>
             
            </div>
            <div className="flex-[1] m-1 min-h[100%] flex-grow bg-white shadow-lg p-2 rounded-xl">
              <p className="flex-grow font-thin text-neutral-700 text-lg">
                Tickets
              </p>
              <hr />
              <Suspense fallback={<Skeleton />}>
                <Tickets />
              </Suspense>

            </div>

          </div>

        </div>

      </PageProvider>
    </PermissionWrapper>
  )
}

export default Dashboard