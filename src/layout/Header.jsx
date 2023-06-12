import { Avatar, Group, Menu, Select, Burger, Box, Breadcrumbs, Anchor } from "@mantine/core"
import { IconChevronRight, IconLogout } from "@tabler/icons"
import { useContext, useEffect, useState, useLayoutEffect } from "preact/hooks"
import { useRouter, route, } from "preact-router"


import appConfig from "../config/appConfig"
import { AuthState } from "../providers/AuthProvider"
import { dropvalue, regsionListSignal, userDataSignal } from "../signals"
import { IconArrowBadgeRightFilled } from "@tabler/icons-react"



export const tilesAvailable = [
  { "value": '071110000', "label": "Koblenz (Verbandsfreie Gemeinde)" },
  { "value": '071310007', "label": "Bad Neuenahr-Ahrweiler (Verbandsfreie Gemeinde)" },
  { "value": '071310070', "label": "Remagen (Verbandsfreie Gemeinde)" },
  { "value": '071310077', "label": "Sinzig (Verbandsfreie Gemeinde)" },
  { "value": '071310090', "label": "Grafschaft (Verbandsfreie Gemeinde)" },
  { "value": '071315001', "label": "Adenau (Verbandsgemeinde)" },
  { "value": '071315002', "label": "Altenahr (Verbandsgemeinde)" },
  { "value": '071315003', "label": "Bad Breisig (Verbandsgemeinde)" },
  { "value": '071315004', "label": "Brohltal (Verbandsgemeinde)" },
  { "value": '071325003', "label": "Daaden-Herdorf (Verbandsgemeinde)" },
  { "value": '071325006', "label": "Hamm (Sieg) (Verbandsgemeinde)" },
  { "value": '071325007', "label": "Kirchen (Sieg) (Verbandsgemeinde)" },
  { "value": '071325008', "label": "Wissen (Verbandsgemeinde)" },
  { "value": '071325009', "label": "Betzdorf-Gebhardshain (Verbandsgemeinde)" },
  { "value": '071325010', "label": "Altenkirchen-Flammersfeld (Verbandsgemeinde)" },
  { "value": '071330006', "label": "Bad Kreuznach (Verbandsfreie Gemeinde)" },
  { "value": '071335001', "label": "Bad Kreuznach (Verbandsgemeinde)" },
  { "value": '071335006', "label": "Rüdesheim (Verbandsgemeinde)" },
  { "value": '071335009', "label": "Kirner Land (Verbandsgemeinde)" },
  { "value": '071335010', "label": "Langenlonsheim-Stromberg (Verbandsgemeinde)" },
  { "value": '071335011', "label": "Nahe-Glan (Verbandsgemeinde)" },
  { "value": '071340045', "label": "Idar-Oberstein (Verbandsfreie Gemeinde)" },
  { "value": '071345001', "label": "Baumholder (Verbandsgemeinde)" },
  { "value": '071345002', "label": "Birkenfeld (Verbandsgemeinde)" },
  { "value": '071345005', "label": "Herrstein-Rhaunen (Verbandsgemeinde)" },
  { "value": '071355001', "label": "Cochem (Verbandsgemeinde)" },
  { "value": '071355002', "label": "Kaisersesch (Verbandsgemeinde)" },
  { "value": '071355003', "label": "Ulmen (Verbandsgemeinde)" },
  { "value": '071355005', "label": "Zell (Mosel) (Verbandsgemeinde)" },
  { "value": '071370003', "label": "Andernach (Verbandsfreie Gemeinde)" },
  { "value": '071370068', "label": "Mayen (Verbandsfreie Gemeinde)" },
  { "value": '071370203', "label": "Bendorf (Verbandsfreie Gemeinde)" },
  { "value": '071375001', "label": "Pellenz (Verbandsgemeinde)" },
  { "value": '071375002', "label": "Maifeld (Verbandsgemeinde)" },
  { "value": '071375003', "label": "Vordereifel (Verbandsgemeinde)" },
  { "value": '071375004', "label": "Mendig (Verbandsgemeinde)" },
  { "value": '071375007', "label": "Vallendar (Verbandsgemeinde)" },
  { "value": '071375008', "label": "Weißenthurm (Verbandsgemeinde)" },
  { "value": '071375009', "label": "Rhein-Mosel (Verbandsgemeinde)" },
  { "value": '071380045', "label": "Neuwied (Verbandsfreie Gemeinde)" },
  { "value": '071385001', "label": "Asbach (Verbandsgemeinde)" },
  { "value": '071385002', "label": "Bad Hönningen (Verbandsgemeinde)" },
  { "value": '071385003', "label": "Dierdorf (Verbandsgemeinde)" },
  { "value": '071385004', "label": "Linz am Rhein (Verbandsgemeinde)" },
  { "value": '071385005', "label": "Puderbach (Verbandsgemeinde)" },
  { "value": '071385007', "label": "Unkel (Verbandsgemeinde)" },
  { "value": '071385009', "label": "Rengsdorf-Waldbreitbach (Verbandsgemeinde)" },
  { "value": '071400501', "label": "Boppard (Verbandsfreie Gemeinde)" },
  { "value": '071405003', "label": "Kastellaun (Verbandsgemeinde)" },
  { "value": '071405004', "label": "Kirchberg (Hunsrück) (Verbandsgemeinde)" },
  { "value": '071405008', "label": "Hunsrück-Mittelrhein (Verbandsgemeinde)" },
  { "value": '071405009', "label": "Simmern-Rheinböllen (Verbandsgemeinde)" },
  { "value": '071410075', "label": "Lahnstein (Verbandsfreie Gemeinde)" },
  { "value": '071415003', "label": "Diez (Verbandsgemeinde)" },
  { "value": '071415007', "label": "Nastätten (Verbandsgemeinde)" },
  { "value": '071415009', "label": "Loreley (Verbandsgemeinde)" },
  { "value": '071415010', "label": "Bad Ems-Nassau (Verbandsgemeinde)" },
  { "value": '071415011', "label": "Aar-Einrich (Verbandsgemeinde)" },
  { "value": '071435001', "label": "Bad Marienberg (Westerwald) (Verbandsgemeinde)" },
  { "value": '071435002', "label": "Hachenburg (Verbandsgemeinde)" },
  { "value": '071435003', "label": "Höhr-Grenzhausen (Verbandsgemeinde)" },
  { "value": '071435004', "label": "Montabaur (Verbandsgemeinde)" },
  { "value": '071435005', "label": "Ransbach-Baumbach (Verbandsgemeinde)" },
  { "value": '071435006', "label": "Rennerod (Verbandsgemeinde)" },
  { "value": '071435007', "label": "Selters (Westerwald) (Verbandsgemeinde)" },
  { "value": '071435008', "label": "Wallmerod (Verbandsgemeinde)" },
  { "value": '071435009', "label": "Westerburg (Verbandsgemeinde)" },
  { "value": '071435010', "label": "Wirges (Verbandsgemeinde)" },
  { "value": '072110000', "label": "Trier (Verbandsfreie Gemeinde)" },
  { "value": '072310134', "label": "Wittlich (Verbandsfreie Gemeinde)" },
  { "value": '072310502', "label": "Morbach (Verbandsfreie Gemeinde)" },
  { "value": '072315001', "label": "Bernkastel-Kues (Verbandsgemeinde)" },
  { "value": '072315006', "label": "Thalfang am Erbeskopf (Verbandsgemeinde)" },
  { "value": '072315008', "label": "Wittlich-Land (Verbandsgemeinde)" },
  { "value": '072315009', "label": "Traben-Trarbach (Verbandsgemeinde)" },
  { "value": '072320018', "label": "Bitburg (Verbandsfreie Gemeinde)" },
  { "value": '072325001', "label": "Arzfeld (Verbandsgemeinde)" },
  { "value": '072325005', "label": "Südeifel (Verbandsgemeinde)" },
  { "value": '072325006', "label": "Prüm (Verbandsgemeinde)" },
  { "value": '072325007', "label": "Speicher (Verbandsgemeinde)" },
  { "value": '072325008', "label": "Bitburger Land (Verbandsgemeinde)" },
  { "value": '072335001', "label": "Daun (Verbandsgemeinde)" },
  { "value": '072335004', "label": "Kelberg (Verbandsgemeinde)" },
  { "value": '072335006', "label": "Gerolstein (Verbandsgemeinde)" },
  { "value": '072355001', "label": "Hermeskeil (Verbandsgemeinde)" },
  { "value": '072355003', "label": "Konz (Verbandsgemeinde)" },
  { "value": '072355004', "label": "Ruwer (Verbandsgemeinde)" },
  { "value": '072355006', "label": "Schweich an der Römischen Weinstraße (Verbandsgemeinde)" },
  { "value": '072355007', "label": "Trier-Land (Verbandsgemeinde)" },
  { "value": '072355008', "label": "Saarburg-Kell (Verbandsgemeinde)" },
  { "value": '073110000', "label": "Frankenthal (Pfalz) (Verbandsfreie Gemeinde)" },
  { "value": '073120000', "label": "Kaiserslautern (Verbandsfreie Gemeinde)" },
  { "value": '073355001', "label": "Bruchmühlbach-Miesau (Verbandsgemeinde)" },
  { "value": '073355002', "label": "Enkenbach-Alsenborn (Verbandsgemeinde)" },
  { "value": '073355008', "label": "Ramstein-Miesenbach (Verbandsgemeinde)" },
  { "value": '073355009', "label": "Weilerbach (Verbandsgemeinde)" },
  { "value": '073355010', "label": "Otterbach-Otterberg (Verbandsgemeinde)" },
  { "value": '073355011', "label": "Landstuhl (Verbandsgemeinde)" },
  { "value": '073130000', "label": "Landau in der Pfalz (Verbandsfreie Gemeinde)" },
  { "value": '073140000', "label": "Ludwigshafen am Rhein (Verbandsfreie Gemeinde)" },
  { "value": '073150000', "label": "Mainz (Verbandsfreie Gemeinde)" },
  { "value": '073160000', "label": "Neustadt an der Weinstraße (Verbandsfreie Gemeinde)" },
  { "value": '073170000', "label": "Pirmasens (Verbandsfreie Gemeinde)" },
  { "value": '073180000', "label": "Speyer (Verbandsfreie Gemeinde)" },
  { "value": '073190000', "label": "Worms (Verbandsfreie Gemeinde)" },
  { "value": '073200000', "label": "Zweibrücken (Verbandsfreie Gemeinde)" },
  { "value": '073310003', "label": "Alzey (Verbandsfreie Gemeinde)" },
  { "value": '073315001', "label": "Alzey-Land (Verbandsgemeinde)" },
  { "value": '073315002', "label": "Eich (Verbandsgemeinde)" },
  { "value": '073315003', "label": "Monsheim (Verbandsgemeinde)" },
  { "value": '073315005', "label": "Wöllstein (Verbandsgemeinde)" },
  { "value": '073315006', "label": "Wörrstadt (Verbandsgemeinde)" },
  { "value": '073315007', "label": "Wonnegau (Verbandsgemeinde)" },
  { "value": '073320002', "label": "Bad Dürkheim (Verbandsfreie Gemeinde)" },
  { "value": '073320024', "label": "Grünstadt (Verbandsfreie Gemeinde)" },
  { "value": '073320025', "label": "Haßloch (Verbandsfreie Gemeinde)" },
  { "value": '073325001', "label": "Deidesheim (Verbandsgemeinde)" },
  { "value": '073325002', "label": "Freinsheim (Verbandsgemeinde)" },
  { "value": '073325005', "label": "Lambrecht (Pfalz) (Verbandsgemeinde)" },
  { "value": '073325006', "label": "Wachenheim an der Weinstraße (Verbandsgemeinde)" },
  { "value": '073325007', "label": "Leiningerland (Verbandsgemeinde)" },
  { "value": '073335002', "label": "Eisenberg (Pfalz) (Verbandsgemeinde)" },
  { "value": '073335003', "label": "Göllheim (Verbandsgemeinde)" },
  { "value": '073335004', "label": "Kirchheimbolanden (Verbandsgemeinde)" },
  { "value": '073335006', "label": "Winnweiler (Verbandsgemeinde)" },
  { "value": '073335007', "label": "Nordpfaelzerland (Verbandsgemeinde)" },
  { "value": '073340007', "label": "Germersheim (Verbandsfreie Gemeinde)" },
  { "value": '073340501', "label": "Wörth am Rhein (Verbandsfreie Gemeinde)" },
  { "value": '073345001', "label": "Bellheim (Verbandsgemeinde)" },
  { "value": '073345002', "label": "Hagenbach (Verbandsgemeinde)" },
  { "value": '073345003', "label": "Jockgrim (Verbandsgemeinde)" },
  { "value": '073345004', "label": "Kandel (Verbandsgemeinde)" },
  { "value": '073345005', "label": "Lingenfeld (Verbandsgemeinde)" },
  { "value": '073345006', "label": "Rülzheim (Verbandsgemeinde)" },
  { "value": '073365008', "label": "Lauterecken-Wolfstein (Verbandsgemeinde)" },
  { "value": '073365009', "label": "Oberes Glantal (Verbandsgemeinde)" },
  { "value": '073365010', "label": "Kusel-Altenglan (Verbandsgemeinde)" },
  { "value": '073375001', "label": "Annweiler am Trifels (Verbandsgemeinde)" },
  { "value": '073375002', "label": "Bad Bergzabern (Verbandsgemeinde)" },
  { "value": '073375003', "label": "Edenkoben (Verbandsgemeinde)" },
  { "value": '073375004', "label": "Herxheim (Verbandsgemeinde)" },
  { "value": '073375005', "label": "Landau-Land (Verbandsgemeinde)" },
  { "value": '073375006', "label": "Maikammer (Verbandsgemeinde)" },
  { "value": '073375007', "label": "Offenbach an der Queich (Verbandsgemeinde)" },
  { "value": '073380004', "label": "Bobenheim-Roxheim (Verbandsfreie Gemeinde)" },
  { "value": '073380005', "label": "Böhl-Iggelheim (Verbandsfreie Gemeinde)" },
  { "value": '073380017', "label": "Limburgerhof (Verbandsfreie Gemeinde)" },
  { "value": '073380019', "label": "Mutterstadt (Verbandsfreie Gemeinde)" },
  { "value": '073380025', "label": "Schifferstadt (Verbandsfreie Gemeinde)" },
  { "value": '073385001', "label": "Dannstadt-Schauernheim (Verbandsgemeinde)" },
  { "value": '073385004', "label": "Maxdorf (Verbandsgemeinde)" },
  { "value": '073385006', "label": "Lambsheim-Heßheim (Verbandsgemeinde)" },
  { "value": '073385007', "label": "Römerberg-Dudenhofen (Verbandsgemeinde)" },
  { "value": '073385008', "label": "Rheinauen (Verbandsgemeinde)" },
  { "value": '073390005', "label": "Bingen am Rhein (Verbandsfreie Gemeinde)" },
  { "value": '073390009', "label": "Budenheim (Verbandsfreie Gemeinde)" },
  { "value": '073390030', "label": "Ingelheim am Rhein (Verbandsfreie Gemeinde)" },
  { "value": '073395001', "label": "Rhein-Nahe (Verbandsgemeinde)" },
  { "value": '073395002', "label": "Bodenheim (Verbandsgemeinde)" },
  { "value": '073395003', "label": "Gau-Algesheim (Verbandsgemeinde)" },
  { "value": '073395006', "label": "Nieder-Olm (Verbandsgemeinde)" },
  { "value": '073395007', "label": "Rhein-Selz (Verbandsgemeinde)" },
  { "value": '073395008', "label": "Sprendlingen-Gensingen (Verbandsgemeinde)" },
  { "value": '073405001', "label": "Dahner Felsenland (Verbandsgemeinde)" },
  { "value": '073405002', "label": "Hauenstein (Verbandsgemeinde)" },
  { "value": '073405003', "label": "Pirmasens-Land (Verbandsgemeinde)" },
  { "value": '073405004', "label": "Rodalben (Verbandsgemeinde)" },
  { "value": '073405006', "label": "Waldfischbach-Burgalben (Verbandsgemeinde)" },
  { "value": '073405008', "label": "Zweibrücken-Land (Verbandsgemeinde)" },
  { "value": '073405009', "label": "Thaleischweiler-Wallhalben (Verbandsgemeinde)" },
]
// {
//   "ags": "073310000",
//   "name": "Alzey-Worms",
//   "bezeichnung": "Kreis",
//   "bemerkung": "Kreis",
//   "kreis": null,
//   "groupid": "021_Alzey-Worms"
// }


export default () => {



  const router = useRouter()
  const auth = useContext(AuthState)
  const [userData, setUserData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [regsionList, setRegsionList] = useState([])




  useLayoutEffect(() => {



    let firstPageLoad = true

    const unsub = () => {

      dropvalue.subscribe((value) => {
        if (firstPageLoad && currentRoute !== '/map') {
          firstPageLoad = false
          return
        }
        const parentRoute = router?.[0]?.path?.replace('/:ags', '') || ''
        route(`${parentRoute}/${value}${window.location.hash}`)
      })

      

      userDataSignal.subscribe(value => {

        setUserData(value)
      })

      regsionListSignal.subscribe(value => {
        setRegsionList(value.map(item => ({
          value: item.ags,
          label: item.name
        })
        ))
      })

    }

    return unsub()
  }, [])

  const logout = () => {
    sessionStorage.removeItem(appConfig.sessionStorageKey)
    auth.setAuth(false)
    window.location.reload()
  }

  const currentRoute = router[0].path
  // useShallowEffect(() => {
  //   if (router[0].matches?.ags) {
  //     dropvalue.value = router[0].matches.ags
  //   } else {
  //     const parentRoute = router?.[0]?.path?.replace('/:ags', '') || ''
  //     // route(`${parentRoute}/${dropvalue.value}${window.location.hash}`)
  //   }
  // }, [])

  return (
    <div className=" z-[100] shadow-lg right-0 left-0 top-0">
    <div className=" items-center  h-20 bg-white flex p-2 text-[#0071b9] ">
      

      <div className="flex-grow font-bold text-[#0071b9] text-lg">
        <h6 className={window.innerWidth < 768 ? 'text-xs' : 'text-lg'}>
          {
           ( (router[0].path?.split(':'))?.[0]?.replace(/\//g, '') || 'Dashboard' ).toUpperCase()
          }
        </h6>
      </div>


      <Select
        className="ml-4"
        radius="lg"
        size="xs"
        placeholder="Select AGS"
        searchable
        autoComplete="on"
        data={regsionList}
        color="brand"
        sx={{ width: 350 }}
        defaultValue={dropvalue.value}
        onChange={(value) => {
          dropvalue.value = value
        }}
      />
      <div className="ml-4">
      </div>
      <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"

      >
     
        <Menu.Target>
          <div className="items-center flex cursor-pointer hover:scale-105 transition-all">
            <Group color="brand" spacing={7}>
              <Avatar size='md' color="brand" variant="outline" radius="lg" />


            </Group>
          </div>
        </Menu.Target>
        <Menu.Dropdown>

          <Box className="p-4">
            <div className="flex items-center">
              <Avatar size='md' radius="lg" />
              <div className="ml-4">
                <h6 className="text-sm font-semibold">{userData?.nachname} {userData?.vorname}</h6>
                <p className="text-xs text-gray-500">{userData?.email}</p>
              </div>
            </div>
          </Box>
          <Menu.Divider />



          <Menu.Item color="red" icon={<IconLogout size={14} stroke={1.5} />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>


    

    </div>
      <Breadcrumbs separator={<IconArrowBadgeRightFilled size={14} className="text-[#0071b9]" />}
      p='xs'
        className="bg-neutral-100 items-center text-xs"
      >{
        [{ title: 'First', href: '#' },
        { title: 'Second', href: '#' },
        { title: 'Third', href: '#' }]
          .map((item, index) => (
            <Anchor href={item.href} key={index}>
              {item.title}
            </Anchor>
          ))
      }
  </Breadcrumbs>
</div>
  )
}