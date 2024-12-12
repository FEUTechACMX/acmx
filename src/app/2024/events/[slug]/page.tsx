// TODO: generate static params for slug

const Event = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const eventSlug = (await params).slug;
    const tags = ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"];

    return (
        <div> 
            <section className="relative">
                <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </section>
            <section className="relative">
                <main className="absolute mx-80 flex gap-10 -top-6">
                    <section>
                        <section>
                            <h1 className="font-black text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#A330B0] via-[#58138D] to-[#3D017D]"> Headline </h1>
                            <div className="flex flex-wrap w-[30rem] gap-2 mt-2">
                                {tags.map((tag, idx) => (
                                    <Tag key={idx} name={tag} />
                                ))}
                            </div>
                        </section>
                        <section className="mt-5">
                            <h2 className="font-extrabold text-xl"> Subhead </h2>
                            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa inventore omnis voluptatum totam, est alias iste blanditiis exercitationem iure quas, eum obcaecati dolorum velit quia facilis. Aspernatur tempora inventore beatae. </p>
                        </section>
                        <section className="mt-5">
                            <h2 className="font-extrabold text-xl"> Media </h2>
                            
                        </section>
                    </section>
                    <section className="w-[40rem] flex flex-col gap-[0.1rem]">
                        <div className="bg-white p-9 rounded-t-xl shadow-xl">
                            <h2 className="font-semibold"> Venue information </h2>
                        </div>
                        <div className="bg-white p-9 rounded-b-xl shadow-xl">
                            henlo
                        </div>
                    </section>
                </main>
            </section>
        </div>
    );
}

const Tag = ({ name }: { name: string }) => {
    return (
        <span className="bg-white px-5 py-[0.4rem] rounded-2xl text-center shadow-lg text-sm">
            {name}
        </span>
    );
}
 
export default Event;