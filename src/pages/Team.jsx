import React from "react";

export function Team() {
  return (
    <div className="max-w-[1000px] mx-auto self-stretch w-full p-5 bg-secondary">
      <div className="flex flex-col w-full h-full px-2 sm:px-5 py-5 text-muted-foreground font-semibold space-y-5">
        <section>
          <h2 className="text-4xl text-center">Meet Our Team</h2>
          <p className="mt-5 text-center font-semibold">
            We are a team of 5 students from the Bilkent University.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="cagri.jpg"
              alt="Cagri"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Mustafa Cagri Durgut</h3>
            <h4 className="text-xl text-muted-foreground mb-3">Manager</h4>
            <p className="italic">Hello</p>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="cagri.jpg"
              alt="Cagri"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Mustafa Cagri Durgut</h3>
            <h4 className="text-xl text-muted-foreground mb-3">Frontend</h4>
            <p className="italic">Hello</p>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="cagri.jpg"
              alt="Cagri"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Mustafa Cagri Durgut</h3>
            <h4 className="text-xl text-muted-foreground mb-3">Backend</h4>
            <p className="italic">Hello</p>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="cagri.jpg"
              alt="Cagri"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Mustafa Cagri Durgut</h3>
            <h4 className="text-xl text-muted-foreground mb-3">
              Meeting Component
            </h4>
            <p className="italic">Hello</p>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="cagri.jpg"
              alt="Cagri"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Mustafa Cagri Durgut</h3>
            <h4 className="text-xl text-muted-foreground mb-3">
              Infrastructure
            </h4>
            <p className="italic">Hello</p>
          </div>
        </section>
      </div>
    </div>
  );
}
