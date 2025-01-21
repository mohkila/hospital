import { Button } from "@/components/ui/button";
import React from "react";

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          
          {/* Image comes first on mobile, second on larger screens */}
          <div className="order-1 md:order-2">
            <img
              src="/dr-2_OLD.png"
              className="bg-primary/50 object-cover shadow-lg shadow-primary/50 rounded-3xl"
              alt="Doctor illustration"
            />
          </div>

          {/* Text comes second on mobile, first on larger screens */}
          <div className="order-2 md:order-1">
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-200 sm:text-3xl">
                Find & Book
                <span className="text-primary text-3xl font-extrabold"> Appoinment </span>
                with Your Favorite Doctor
                <span className="text-primary text-3xl font-extrabold"> Doctor </span>
              </h2>

              <p className="mt-4 text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                doloremque saepe architecto maiores repudiandae amet perferendis
                repellendus, reprehenderit voluptas sequi.
              </p>

              <Button className="mt-8"> Explore Now</Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
