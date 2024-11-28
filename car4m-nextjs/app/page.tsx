import Image from "next/image";
import PageHome from "./home/page";
import Profile from "./profile/page";
import Test from "./test/page";
import Search from "./search/page";
import Car from "./car/page";
import CarRegistry from "./registrycar/page";
import DatePickerFrame from "./car/datepicker";
import Admin from "./admin/page";
import Owner from "./owner/page";

export default function Home() {
  return (  
    <>
      <Owner />
    </>
  );
}
