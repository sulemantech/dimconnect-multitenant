import { Card, Grid, Skeleton, Title } from "@mantine/core"
import { Suspense, lazy } from "preact/compat"
import { PERMISSIONS } from "../../../../common"
import PageProvider from "../../../../providers/PageProvider"
import PermissionWrapper from "../../../../providers/PermissionsProvider"
import MapElements from "./MapElements"
import { useTranslation } from "react-i18next";

const MaterialCount = lazy(() => import("./MaterialCount"))
const CostInfo = lazy(() => import("./CostInfo"))
const CostInfoChart = lazy(() => import("./CostInfoChart"))
const Submap = lazy(() => import("./Submap"))
const Tickets = lazy(() => import("./Tickets"))

const Dashboard = () => {
  const {t}=useTranslation()

  return (
    <PermissionWrapper permission={PERMISSIONS.Dashboard} view>
      <PageProvider>

        {/* <div className="flex flex-col md:flex-row">
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

                <Suspense fallback={<LoadingOverlay visible />}>
                  <CostInfo />

                </Suspense>
              </div>


            </div>

          </div>
          <div className="flex-grow flex flex-col" >
            <div className="flex flex-col md:flex-row">
              <div className="flex-[1] relative m-1 w-80 h-[400px] bg-white shadow-lg p-2 justify-right rounded-xl">

                <Suspense fallback={<Skeleton />}>
                  <Submap />
                </Suspense>
                <hr />
                <Badge color="blue" variant="outline" size="xs" className="mb-1">
                  {t('Click on the map to enlarge')}
                </Badge>

              </div>

            </div>
            <div className="flex flex-col flex-grow md:flex-row flex-1">
              <div className="flex-[1]  min-h-[300px] m-1 bg-white shadow-lg p-2 rounded-xl ">

                <Suspense fallback={<Skeleton />}>
                  <CostInfoChart />
                </Suspense>
              </div>

            </div>


          </div>

        </div>
        <div className="flex-[1] m-1 min-h[100%] flex-grow bg-white shadow-lg p-2 rounded-xl">
          <p className="flex-grow font-thin text-neutral-700 text-lg">
            {t('Support Tickets')}
          </p>
          <hr />
         

        </div> */}
        <Grid>
          <Grid.Col md={8}>
            <Suspense fallback={<Skeleton />}>
              <MaterialCount />
              <CostInfo />
            </Suspense>
          </Grid.Col>
          <Grid.Col md={4} className="flex flex-col">
            <Suspense fallback={<Skeleton />}>
              <MapElements />
              <Submap />
            </Suspense>
          </Grid.Col>
        </Grid>
        <Card className="my-3">
          <Title order={3}>Support Ticket Inbox</Title>
        </Card>
        <Suspense fallback={<Skeleton />}>
            <Tickets />
          </Suspense>
      </PageProvider>
    </PermissionWrapper>
  )
}

export default Dashboard