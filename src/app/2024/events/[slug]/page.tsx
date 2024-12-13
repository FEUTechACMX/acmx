import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";

import { User, MapPin, Calendar1 } from "lucide-react";

// TODO: generate static params for slug

const Event = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const eventSlug = (await params).slug;
    const tags = ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"];

    return (
        <div className="relative mb-[8rem]"> 
            <section className="relative">
                <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-56 sm:h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </section>
            <section className="fixed lg:hidden z-50 bottom-0 p-2 w-full">
                <Register mobileView />
            </section>
            <section className="relative flex justify-center mx-6 md:mx-10">
                <main className="relative flex gap-10 -top-6">
                    <section className="relative max-w-[50rem]">
                        <section>
                            <h1 className="font-black text-4xl md:text-5xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#A330B0] via-[#58138D] to-[#3D017D] dark:from-[#C676C6] dark:via-[#AC79D0] dark:to-[#A261E5]"> Headline </h1>
                            <div className="flex flex-wrap lg:w-[30rem] gap-2 mt-2">
                                {tags.map((tag, idx) => (
                                    <Tag key={idx} name={tag} />
                                ))}
                            </div>
                        </section>
                        <section className="mt-5">
                            <h2 className="font-extrabold text-xl"> Subhead </h2>
                            <p className="text-justify"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores labore, libero nulla in ducimus aliquid laboriosam corporis veritatis tenetur corrupti minus quod totam sequi natus cum voluptas nemo ipsum expedita reiciendis explicabo blanditiis possimus provident voluptate. Magni eligendi minus necessitatibus neque ex quia temporibus in cum, voluptatem qui ad perferendis. </p>
                        </section>
                        <section className="lg:hidden mt-4">
                            <VenueInformation mobileView />
                        </section>
                        <section className="mt-5">
                            <h2 className="font-extrabold text-xl"> Media </h2>
                            <Carousel 
                                className="mt-2 shadow-xl" 
                                opts={{ align: "start", loop: true }}
                            >
                                <CarouselContent className="">
                                    {Array.from({ length: 2}).map((_, idx) => (
                                        <CarouselItem key={idx}>
                                            <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-[14rem] md:h-[30rem] rounded-xl" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-1 lg:left-3" />
                                <CarouselNext className="right-1 lg:right-3" />
                            </Carousel>
                        </section>
                        <section className="mt-5">
                            <h2 className="font-extrabold text-xl"> Sponsors </h2>
                            <Carousel 
                                className="mt-2 shadow-xl" 
                                opts={{ align: "start", loop: true }}
                            >
                                <CarouselContent className="">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <CarouselItem key={idx} className="basis-1/3">
                                            <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-[6rem] md:h-[10rem] rounded-xl" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-1 lg:left-3" />
                                <CarouselNext className="right-1 lg:right-3" />
                            </Carousel>
                        </section>
                    </section>
                    <section className="min-w-[22rem] hidden lg:flex flex-col gap-[0.1rem] sticky top-8 self-start">
                        <VenueInformation />
                        <Register />
                    </section>
                </main>
            </section>
        </div>
    );
}

const Tag = ({ name }: { name: string }) => {
    return (
        <span className="bg-[#F9F9F9] dark:bg-[#261a35] px-5 py-[0.4rem] rounded-2xl text-center shadow-lg text-sm">
            {name}
        </span>
    );
}

const Register = ({ mobileView }: { mobileView?: boolean }) => {
    if (mobileView)
        return (
            <div className="bg-[#F9F9F9] dark:bg-[#261a35] px-5 py-4 rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.4)] dark:shadow-[0_0_30px_0_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-end">
                    <h1 className="font-bold text-[#6A086A] dark:text-[#E4CAFF] text-xl sm:text-2xl"> ₱ 150.00 / Free </h1>
                    <p className="font-light text-[#474747] dark:text-[#CFCFCF] text-md"> 14 tickets left </p>
                </div>
                <div className="mt-2 bg-black inline-block rounded-md w-full">
                    <Button className="text-md font-bold h-[3rem] sm:h-[3.5rem] w-full bg-gradient-to-r from-[#A330B0] via-[#58138D] to-[#3D017D] dark:from-[#C676C6] dark:via-[#AC79D0] dark:to-[#A261E5] hover:opacity-80 transition-all duration-150"> Register now </Button>
                </div>
            </div>
        );
    
    return (
        <div className="bg-[#F9F9F9] dark:bg-[#261a35] p-9 rounded-b-xl shadow-xl">
            <h1 className="font-extrabold text-[#6A086A] dark:text-[#E4CAFF] text-3xl"> ₱ 150.00 / Free </h1>
            <p className="font-light text-[#474747] dark:text-[#CFCFCF] text-md"> 14 tickets left </p>
            <div className="mt-2 bg-black inline-block rounded-md">
                <Button className="text-lg font-semibold h-[3rem] w-[10rem] bg-gradient-to-r from-[#A330B0] via-[#58138D] to-[#3D017D] dark:from-[#C676C6] dark:via-[#AC79D0] dark:to-[#A261E5] hover:opacity-80 transition-all duration-150"> Register now </Button>
            </div>
        </div>
    );
}

const VenueInformation = ({ mobileView }: { mobileView?: boolean }) => {
    if (mobileView)
        return (
            <div className="bg-[#F9F9F9] dark:bg-[#261a35] p-7 md:p-9 rounded-xl shadow-xl">
                <h2 className="font-bold"> Venue information </h2>
                <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center gap-4">
                        <User stroke="#653765" strokeWidth={2} size={24} className="dark:hidden" />
                        <User stroke="#C676C6" strokeWidth={2} size={24} className="hidden dark:inline-block" />
                        <p> FEU Tech ACM Student Chapter </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin stroke="#653765" strokeWidth={2} size={24} className="dark:hidden" />
                        <MapPin stroke="#C676C6" strokeWidth={2} size={24} className="hidden dark:inline-block" />
                        <p> FEU Institute of Technology </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar1 stroke="#653765" strokeWidth={2} size={24} className="dark:hidden"/>
                        <Calendar1 stroke="#C676C6" strokeWidth={2} size={24} className="hidden dark:inline-block"/>
                        <p> November 10, 2024 · 12:00 PM </p>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            <div className="bg-[#F9F9F9] dark:bg-[#261a35] p-9 rounded-t-xl shadow-xl">
                <h2 className="font-bold"> Venue information </h2>
                <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center gap-4">
                        <User stroke="#653765" strokeWidth={2} size={24} className="dark:hidden" />
                        <User stroke="#C676C6" strokeWidth={2} size={24} className="hidden dark:inline-block" />
                        <p> FEU Tech ACM Student Chapter </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin stroke="#653765" strokeWidth={2} size={24} className="dark:hidden" />
                        <MapPin stroke="#C676C6" strokeWidth={2} size={24} className="hidden dark:inline-block" />
                        <p> FEU Institute of Technology </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar1 stroke="#653765" strokeWidth={2} size={24} className="dark:hidden"/>
                        <Calendar1 stroke="#C676C6" strokeWidth={2} size={24} className="hidden dark:inline-block"/>
                        <p> November 10, 2024 · 12:00 PM </p>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Event;