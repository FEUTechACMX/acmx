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
        <div className="mb-[20dvh]"> 
            <section className="relative">
                <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </section>
            <section className="relative flex justify-center">
                <main className="relative flex gap-10 -top-6">
                    <section className="max-w-[50rem]">
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
                            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores labore, libero nulla in ducimus aliquid laboriosam corporis veritatis tenetur corrupti minus quod totam sequi natus cum voluptas nemo ipsum expedita reiciendis explicabo blanditiis possimus provident voluptate. Magni eligendi minus necessitatibus neque ex quia temporibus in cum, voluptatem qui ad perferendis. </p>
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
                                            <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-[30rem] rounded-xl" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-3" />
                                <CarouselNext className="right-3" />
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
                                            <img src="/placeholder/bg.png" alt="" className="object-cover w-full h-[10rem] rounded-xl" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-3" />
                                <CarouselNext className="right-3" />
                            </Carousel>
                        </section>
                    </section>
                    <section className="min-w-[22rem] flex flex-col gap-[0.1rem] sticky top-8 self-start">
                        <div className="bg-[#F9F9F9] p-9 rounded-t-xl shadow-xl">
                            <h2 className="font-bold"> Venue information </h2>
                            <div className="flex flex-col gap-3 mt-4">
                                <div className="flex items-center gap-4">
                                    <User stroke="#653765" strokeWidth={2} size={24} />
                                    <p> FEU Tech ACM Student Chapter </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin stroke="#653765" strokeWidth={2} size={24} />
                                    <p> FEU Institute of Technology </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Calendar1 stroke="#653765" strokeWidth={2} size={24} />
                                    <p> November 10, 2024 · 12:00 PM </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F9F9F9] p-9 rounded-b-xl shadow-xl">
                            <h1 className="font-extrabold text-[#6A086A] text-3xl"> ₱ 150.00 / Free </h1>
                            <p className="font-light text-[#474747] text-md"> 14 tickets left </p>
                            <div className="mt-2 bg-black inline-block rounded-md">
                                <Button className="text-lg font-semibold h-[3rem] w-[10rem] bg-gradient-to-r from-[#A330B0] via-[#58138D] to-[#3D017D] hover:opacity-80 transition-all duration-150"> Register now </Button>
                            </div>
                        </div>
                    </section>
                </main>
            </section>
        </div>
    );
}

const Tag = ({ name }: { name: string }) => {
    return (
        <span className="bg-[#F9F9F9] px-5 py-[0.4rem] rounded-2xl text-center shadow-lg text-sm">
            {name}
        </span>
    );
}
 
export default Event;