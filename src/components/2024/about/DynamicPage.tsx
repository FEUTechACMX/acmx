export default function UserProfile() {
  return (
    <section className="h-[100vh] flex-wrap bg-white">
      //Profile section
      <div className="flex items-start justify-center">
        <img src="" alt="" />
        <h1>Kourai</h1>
      </div>
      <div className="details"></div>
      //Socials section
      <div className="socials flex-wrap">
        <div className="flex w-full">
          <div>
            <img src="" alt="" className="logo" />
            <h1>Github</h1>
          </div>
        </div>
        <div className="flex w-full">
          <div>
            <img src="" alt="" className="logo" />
            <h1>Facebook</h1>
          </div>
        </div>
        <div className="flex w-full">
          <div>
            <img src="" alt="" className="logo" />
            <h1>Twitter</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
