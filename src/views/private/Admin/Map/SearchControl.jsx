import { Input, Loader } from "@mantine/core";
import {
  useClickOutside,
  useDebouncedState,
  useDidUpdate,
} from "@mantine/hooks";
import { IconSearch } from "@tabler/icons";
import { booleanWithin } from "@turf/turf";
import { useState } from "preact/hooks";
import { useMap } from "react-map-gl";
import { districts, dropvalue, regsionListSignal } from "../../../../signals";

import { showNotification } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export default ({ within = false, nohead = false, marketsearch = false }) => {
    const { t } = useTranslation();

  const [search, setSearch] = useDebouncedState("", 500);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = useClickOutside(() => setSearchResult([]));
  const map = useMap()?.current;

  const community = districts.value?.features?.find(
    (district) => district.properties.c[0] === dropvalue.value
  );

  useDidUpdate(() => {
    if (search.length > 0) {
      setLoading(true);
      (async () => {
        const req = await fetch(
          `https://sg.geodatenzentrum.de/gdz_geokodierung__6b23477c-4ea6-1a73-d0f0-c6c82cfa13d6/suggest?query=${search}`
        );
        const result = await req.json();

        setSearchResult(result);
        setLoading(false);
      })();
    }
  }, [search]);

  const goTo = async (item) => {
    if (item) {
      const req = await fetch(
        `https://sg.geodatenzentrum.de/gdz_geokodierung__6b23477c-4ea6-1a73-d0f0-c6c82cfa13d6/geosearch?query=${item.suggestion}`
      );
      const result = await req.json();

      if (result.features.length > 0) {
        const firstFeatureCoordinates = result.features[0].geometry.coordinates;

        const founddistricts = districts.value?.features.map((district) => {
          const point = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                firstFeatureCoordinates[0],
                firstFeatureCoordinates[1],
              ],
            },
          };
          if (!marketsearch) {
            if (booleanWithin(point, district)) {
              if (
                regsionListSignal.value
                  ?.map((item) => item.ags)
                  .includes(district.properties.c[0])
              ) {
                dropvalue.value = district.properties.c[0];
                setTimeout(() => {
                  map.flyTo({
                    center: [
                      firstFeatureCoordinates[0],
                      firstFeatureCoordinates[1],
                    ],
                    zoom: 15,
                  });
                }, 1000);
                return district;
              } else {
                showNotification({
                  title: "District not available",
                  message: "This district is not available right now.",
                  color: "red",
                });
              }
            }
          } else {
            dropvalue.value = district.properties.c[0];
            setTimeout(() => {
              map.flyTo({
                center: [
                  firstFeatureCoordinates[0],
                  firstFeatureCoordinates[1],
                ],
                zoom: 15,
              });
            }, 1000);
            return district;
          }
        });

        if (founddistricts.length === 0) {
          showNotification({
            title: "District not available",
            message: "This district is not available right now.",
            color: "red",
          });
        }
      }

      setSearchResult([]);
    }
  };
  return (
    <>
      <div
        className={`absolute flex flex-col w-64 z-50 left-2 top-${
          !nohead ? "2" : "2"
        }`}
      >
        <Input
          id="scale-down"
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          rightSection={loading && <Loader size={"xs"} />}
          placeholder={t('Search')}
          color="white"
          icon={<IconSearch className=" max-2xl:w-4 text-[#0E76BB] " />}
          variant="unstyled"
          className="shadow-lg text-[#0E76BB] bg-white  border-white border-solid border-2 rounded-lg"
        />

        <div
          className={` flex flex-col left-2 max-h-96 overflow-y-auto`}
          ref={ref}
        >
          {searchResult?.map((item, index) => {
            return (
              <>
                <div
                  onClick={() => goTo(item)}
                  key={index}
                  className="bg-white bg-opacity-0 backdrop-blur-xl shadow-lg p-2 cursor-pointer hover:bg-opacity-30 hover:scale-96 transition-all"
                >
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: item.highlighted }}
                      />
                      <div className="text-xs text-gray-500">{item.type}</div>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
