'use client'
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import UserCard from "../main/Profile";
import { toggleProfile } from "@/store/functions/ui";

export function ProfileWrapper() {

  const disp = useAppDispatch();
  const open = useAppSelector(state => state.ui.openProfile)

  const user = useAppSelector(state => state.auth)

  function close(){
    disp(toggleProfile())
  }

  return (
    <section onClick={close} className={`bg-slate-500/20 w-full h-full fixed z-50 top-0  ${open ? 'flex' : 'hidden'} flex-row-reverse`}>
      <UserCard
        credits={user.creadits}
        premium={user.is_premium_user}
        email={user.email}
        name={user.full_name}
        onClose={close}
      />
    </section>
  );
}