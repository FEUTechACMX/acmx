import Image from "next/image";
const ACMLogo: React.FC = () => {
    return (
        <Image
            src="/acm/FIT_ACM.png"
            alt="FEU Tech ACM Logo"
            fill
            style={{
                objectFit: "contain",
            }}
            className="m-auto"
            quality={15}
            priority
        ></Image>
    );
};

export default ACMLogo;