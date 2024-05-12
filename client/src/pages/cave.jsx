import List from "../components/list";
import Nav from "../components/nav"


function Cave() {
    return (
    <>
      <Nav/>

      <div className='text-7xl font-semibold text-center pt-14'>
        <span className="text-neutral-950">Votre </span>
        <span className="text-indigo-600">Cave</span>
      </div>

      <List/>

    </>
  )
}

export default Cave;