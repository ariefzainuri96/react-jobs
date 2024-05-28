type HeroType = {
  title?: string;
  subtitle?: string;
};

const Hero = ({
  title = "Become a React Dev",
  subtitle = "Find the React job that fits your skills and needs",
}: HeroType) => {
  return (
    <section className="mb-4 bg-indigo-700 py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="my-4 text-xl text-white">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
