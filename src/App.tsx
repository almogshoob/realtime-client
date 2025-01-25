import { useState } from "react";
import "./App.css";
import { stops } from "./assets/data";
import { Navbar, StopCard } from "./components";
import { RouteSchedule } from "./types";
import { getStopsSchedules } from "./utils";

const userStops: { [key: string]: string[] } = {
  38234: ["84", "84א"],
  38229: ["84", "84א"],
  37995: ["180", "292", "166", "470", "471", "472", "473"],
  38129: ["292", "166", "472", "473", "68"],
  30530: ["68", "70", "250"],
  22942: ["68", "70", "180", "292"],
  21684: ["68", "70", "292"],
  31366: ["471"],
  // 20717: ["R1", "R2", "R3"],
};

/* dummy data
const stopsSchedules: { [stopId: string]: RouteSchedule[] } = {
  39311: [
    {
      shortName: "68",
      headsign: "מרכזית תל אביב",
      color: "orange",
      arrivals: [
        {
          isRealtime: true,
          arrivalTime: 1737758943,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: true,
          arrivalTime: 1737759640,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "70",
      headsign: "קניון איילון",
      color: "blue",
      arrivals: [
        {
          isRealtime: true,
          arrivalTime: 1737758943,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: true,
          arrivalTime: 1737759640,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
  ],
  35694: [],
};
*/

const staticDemoData = {
  "13207": [
    {
      shortName: "70",
      headsign: "רמת גן_שער מזרחי שיבא",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737822586,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737823843,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737825254,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826934,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828228,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829826,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "292",
      headsign: "פתח תקווה_הדר גנים",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737823463,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737824723,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826282,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827842,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829158,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830739,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "68",
      headsign: "קרית אונו_מסוף קרית אונו",
      color: "F78F1E",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737825626,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827065,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828456,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829821,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737831455,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832779,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
  ],
  "13274": [
    {
      shortName: "180",
      headsign: "אלעד_מסוף אוטובוסים",
      color: "F78F1E",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737825470,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826335,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826980,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827929,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828678,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829427,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
      ],
    },
    {
      shortName: "70",
      headsign: "רמת גן_שער מזרחי שיבא",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737823689,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737824417,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737825903,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827767,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829082,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830477,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "292",
      headsign: "פתח תקווה_הדר גנים",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737824439,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826589,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828332,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829568,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830768,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832089,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "68",
      headsign: "קרית אונו_מסוף קרית אונו",
      color: "F78F1E",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737826640,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827898,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829234,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830374,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832036,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737833452,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
  ],
  "15639": [],
  "25092": [
    {
      shortName: "292",
      headsign: "פתח תקווה_הדר גנים",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737824689,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826861,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828534,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829804,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830965,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832302,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "68",
      headsign: "קרית אונו_מסוף קרית אונו",
      color: "F78F1E",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737826862,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828081,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829493,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830638,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832240,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737833748,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "472",
      headsign: "ראש העין_פסגות אפק",
      color: "8cd024",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737825551,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830464,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832199,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737833901,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737836302,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737837509,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
      ],
    },
  ],
  "25192": [
    {
      shortName: "84א",
      headsign: "אור יהודה_מסוף אור יהודה",
      color: "8cd024",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737826308,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737832562,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
  ],
  "25197": [
    {
      shortName: "84א",
      headsign: "פתח תקווה_מסוף משה ארנס",
      color: "8cd024",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737831996,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737838311,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
  ],
  "35694": [
    {
      shortName: "470",
      headsign: "בני ברק_אזור התעשייה",
      color: "8cd024",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737836393,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "292",
      headsign: "בני ברק_קניון איילון",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737823853,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737825178,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826691,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828012,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829524,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830918,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "472",
      headsign: "תל אביב יפו_תחנה מרכזית",
      color: "8cd024",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737826217,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828283,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829715,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737831428,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737833486,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737835490,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
      ],
    },
    {
      shortName: "180",
      headsign: "בני ברק_אזור התעשייה",
      color: "F78F1E",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737824579,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737825479,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826379,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827664,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828179,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829079,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: false,
        },
      ],
    },
  ],
  "39311": [
    {
      shortName: "68",
      headsign: "תל אביב יפו_מסוף רדינג",
      color: "F78F1E",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737825910,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827168,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737828757,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737830380,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737831662,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737833013,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
    {
      shortName: "70",
      headsign: "תל אביב יפו_רכבת מרכז",
      color: "004c99",
      arrivals: [
        {
          isRealtime: false,
          arrivalTime: 1737822043,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737823664,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737825042,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737826546,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737827999,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
        {
          isRealtime: false,
          arrivalTime: 1737829578,
          arrivalDelay: 0,
          isPickup: true,
          isDropOff: true,
          isAccessible: true,
        },
      ],
    },
  ],
};

function App() {
  const [stopsSchedule, setStopsSchedule] = useState<{
    [stopId: string]: RouteSchedule[];
  }>({});

  const userStopsById = Object.fromEntries(
    Object.entries(userStops).map(([stopCode, lines]) => {
      const stopId = stops.find((stop) => stop.code === stopCode)!.id;
      return [stopId, lines];
    })
  );

  const handleFetch = async () => {
    try {
      const stopsScheduleData = staticDemoData;
      // const stopsScheduleData = await getStopsSchedules(userStopsById);
      setStopsSchedule(stopsScheduleData);
    } catch (error) {
      alert("error" + JSON.stringify(error));
    }
  };

  return (
    <>
      <Navbar handleRefresh={handleFetch} />
      <main className="content">
        <div className="stop-list">
          {Object.entries(stopsSchedule).map(([stopId, lines]) => {
            const stopStaticData = stops.find((stop) => stop.id === stopId)!;
            return (
              <StopCard key={stopId} stopData={stopStaticData} lines={lines} />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;

// TODO
// - display saved stops sorted by distance, lines sorted by next time
// - refresh button to data and location
// - stop menu button with edit / delete
// - search route once (nearby)
// - update time every 30s and clean past
// - use password (https://bigprimes.org/)
// - remove component not used (templates)
