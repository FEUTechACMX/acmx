const Spinner: React.FC = () => {
    return (
        <section className="h-svh w-svw flex top-0 left-0 justify-center items-center fixed z-50 backdrop-blur-sm">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-[#823fe0] animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-0 border-4 border-[#823fe0] animate-[spin_2s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 border-4 border-[#823fe0] animate-[spin_1s_linear_infinite]"></div>
                <div className="absolute inset-0 bg-white animate-pulse"></div>
            </div>
        </section>
    );
};

export default Spinner;

