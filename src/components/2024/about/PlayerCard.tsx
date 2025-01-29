function Card({ className = "" }) {
    const members = [
        { name: 'Kourai', team: 'team 4', role: 'intern', image: '' },
        { name: 'Jinx', team: 'team 4', role: 'intern', image: '' },
        { name: 'Kiran', team: 'team 4', role: 'intern', image: '' },
    ];

    // return (
    //     <div className={`relative h-[700px] w-[390px] ${className}`}>
    //         <img src="/about/content.svg" alt="" className="relative h-[655.2px] w-[345.6px]" />
    //         <img src="/about/bgremove.png" alt="" className="relative overlap-hidden" />
    //         <div className="details relative">
    //             <h1>Kourai</h1>
    //             <p>Team 4</p>
    //             <p>Intern</p>
    //         </div>
    //     </div>
    // );
}

export default function PlayerCard(){
    return(
        <div className="relative w-[399.2px] h-[700px] overflow-hidden">
            <img src="/about/content.svg" className="h-[655.2px] w-[345.6px] top-[15px] left-[27.1px] absolute" alt="" />
            {/* <h1 className="absolute text-8xl -rotate-90 font-header top-[100px] m-0 p-0"></h1> */}
            <img src="/about/bgremove.png" alt="" className="h-auto w-[345.6px] top-[30px] left-[27.1px] absolute" />
            {/* <h1 className="absolute">Winter</h1>
            <p className="absolute">Team 4</p> */}
            <img className='absolute h-[655.2px] w-[399.2px]  top-[15px]' src="/about/Card.svg" alt="" />
            <img className='absolute h-[151.2px] w-[399.2px]  top-[519px] ' src="/about/BottomComponent.svg" alt="" />
            <img className='absolute h-[700px] w-[139.2px]  left-[260px] ' src="/about/TopPart.svg" alt="" />
        </div>
    )
}