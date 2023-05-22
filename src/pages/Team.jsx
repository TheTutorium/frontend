import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";
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
              src="ozgur.jpg"
              alt="ozgur"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Halil Ozgur Demir</h3>
            <h4 className="text-xl text-muted-foreground mb-3">
              Meeting Component / R&D
            </h4>
            <div className="flex justify-center space-x-5 mt-4 text-primary">
              <a
                href="https://github.com/hozgurde"
                target="_blank"
                rel="noreferrer"
              >
                <Github name="github" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/halil-özgür-demir-9155301a3/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin name="linkedin" className="w-6 h-6 " />
              </a>
              <a
                href="mailto:hozgurde@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail name="mail" className="w-6 h-6 " />
              </a>
              <a
                href="https://instagram.com/hozgurde"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram name="insta" className="w-6 h-6 " />
              </a>
            </div>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="cagri.jpg"
              alt="Cagri"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Mustafa Cagri Durgut</h3>
            <h4 className="text-xl text-muted-foreground mb-3">
              Frontend/Infra
            </h4>

            <div className="flex justify-center space-x-5 mt-4 text-primary">
              <a
                href="https://github.com/mcagridurgut"
                target="_blank"
                rel="noreferrer"
              >
                <Github name="github" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mcagri/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin name="linkedin" className="w-6 h-6 " />
              </a>
              <a
                href="mailto:mcagridurgut@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail name="mail" className="w-6 h-6 " />
              </a>

              <a
                href="https://mcagridurgut.com"
                target="_blank"
                rel="noreferrer"
              >
                <Globe name="globe" className="w-6 h-6 " />
              </a>
            </div>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="yusuf.jpg"
              alt="yusuf"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Yusuf Mirac Uyar</h3>
            <h4 className="text-xl text-muted-foreground mb-3">Frontend</h4>
            <div className="flex justify-center space-x-5 mt-4 text-primary">
              <a
                href="https://github.com/Y-Yosu"
                target="_blank"
                rel="noreferrer"
              >
                <Github name="github" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yusuf-uyar/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin name="linkedin" className="w-6 h-6 " />
              </a>
              <a
                href="mailto:yusufuyar2000@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail name="mail" className="w-6 h-6 " />
              </a>
            </div>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="baris.jpg"
              alt="baris"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Baris Ogun Yoruk</h3>
            <h4 className="text-xl text-muted-foreground mb-3">Backend</h4>
            <div className="flex justify-center space-x-5 mt-4 text-primary">
              <a
                href="https://github.com/barisoyoruk"
                target="_blank"
                rel="noreferrer"
              >
                <Github name="github" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/barisyoruk/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin name="linkedin" className="w-6 h-6 " />
              </a>
              <a
                href="mailto:barisoyoruk@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail name="mail" className="w-6 h-6 " />
              </a>

              <a
                href="https://instagram.com/barisoguny"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram name="insta" className="w-6 h-6 " />
              </a>
            </div>
          </div>
          <div className="card border p-5 rounded-lg text-center">
            <img
              src="ozco.jpg"
              alt="ozco"
              className="mx-auto w-48 h-48 rounded-full mb-5"
            />
            <h3 className="text-2xl mb-2">Oguzhan Ozcelik</h3>
            <h4 className="text-xl text-muted-foreground mb-3">
              Meeting Component
            </h4>
            <div className="flex justify-center space-x-5 mt-4 text-primary">
              <a
                href="https://github.com/ozc0"
                target="_blank"
                rel="noreferrer"
              >
                <Github name="github" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/oguzhan-ozcelik-0151"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin name="linkedin" className="w-6 h-6 " />
              </a>
              <a
                href="mailto:oguzhanozcelik0151@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail name="mail" className="w-6 h-6 " />
              </a>

              <a
                href="https://instagram.com/ouzanozcelik"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram name="insta" className="w-6 h-6 " />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
