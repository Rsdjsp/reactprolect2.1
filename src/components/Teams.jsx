import { useSelector } from "react-redux";

import Team from "./Team";

export default function Teams() {
  const teams = useSelector((state) => state.team);

  return (
    <div className="w-screen h-full max-h-full grid grid-flow-row grid-cols-3 gap-6 pt-4 px-9 pb-20">
      {teams && teams.teams.map((team) => <Team team={team} key={team._id} />)}
    </div>
  );
}
