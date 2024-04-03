function Avatar({ name }: { name: string }) {
  return (
    <div className=" flex w-10 h-10 font-sm bg-slate-200 rounded-full justify-center items-center font-thin cursor-pointer">
      {name[0]}
    </div>
  );
}

export default Avatar;
