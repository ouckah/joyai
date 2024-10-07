"use client";

import { Navbar } from "../_components/Navbar";
import { ScrollContainer } from "../_components/ScrollableContainer";

export default function Help() {
  const suicideResources = [
    {
      name: "National Suicide Prevention Hotline",
      link: "https://suicidepreventionlifeline.org/",
      description:
        "A free and confidential 24/7 service that provides support, information, and resources for people in distress or crisis.",
    },
    {
      name: "NAMI Helpline",
      link: "https://www.nami.org/Find-Support/NAMI-HelpLine",
      description:
        "A free, nationwide peer-support service offering information and support to individuals living with mental health conditions and their families.",
    },
    {
      name: "Crisis Hotline",
      link: "http://www.crisistextline.org/",
      description:
        "A free, 24/7 text line that connects individuals in crisis with trained crisis counselors for immediate support.",
    },
    {
      name: "National Domestic Violence Hotline",
      link: "http://www.thehotline.org/",
      description:
        "Provides 24/7 support and resources for individuals experiencing domestic violence and their families.",
    },
    {
      name: "National Sexual Assault Hotline",
      link: "https://www.rainn.org/about-national-sexual-assault-telephone-hotline",
      description:
        "A 24/7 hotline that connects survivors of sexual assault with trained advocates who provide support and resources.",
    },
    {
      name: "Veteran Crisis Line",
      link: "https://www.veteranscrisisline.net/",
      description:
        "A 24/7 hotline providing free and confidential support for veterans in crisis and their families.",
    },
    {
      name: "Suicide Hotlines By State",
      link: "http://www.suicide.org/suicide-hotlines.html",
      description:
        "A comprehensive list of suicide hotlines available in each state in the United States, providing local support resources.",
    },
    {
      name: "International Suicide Hotlines",
      link: "http://www.suicide.org/international-suicide-hotlines.html",
      description:
        "A list of suicide prevention hotlines and resources available globally for individuals in crisis.",
    },
  ];

  const general = [
    {
      name: "National Alliance on Mental Health - NAMI",
      link: "http://www.nami.org/",
      description:
        "A national organization that advocates for mental health awareness and provides support to individuals and families affected by mental illness.",
    },
    {
      name: "American Foundation for Suicide Prevention - AFSP",
      link: "https://www.afsp.org/",
      description:
        "A leading organization dedicated to saving lives and bringing hope to those affected by suicide through research, education, and advocacy.",
    },
    {
      name: "Healthy Minds",
      link: "https://www.bbrfoundation.org/healthy-minds-tv",
      description:
        "A series aimed at providing mental health education through engaging content and interviews with experts.",
    },
    {
      name: "National Institute of Mental Health - NIMH",
      link: "https://www.nimh.nih.gov/index.shtml",
      description:
        "The lead federal agency for research on mental disorders, providing information on mental health conditions and treatments.",
    },
    {
      name: "To Write Love On Her Arms - TWLOHA",
      link: "https://twloha.com/",
      description:
        "A non-profit organization dedicated to presenting hope and finding help for people struggling with depression, addiction, self-injury, and suicide.",
    },
    {
      name: "American Association of Suicidology - AAS",
      link: "http://www.suicidology.org/",
      description:
        "An organization that promotes the understanding and prevention of suicide through research, education, and advocacy.",
    },
    {
      name: "Association for Behavioral and Cognitive Therapies - ABCT",
      link: "http://www.abct.org/Home/",
      description:
        "A professional organization dedicated to the advancement of cognitive and behavioral therapies for the treatment of psychological disorders.",
    },
    {
      name: "Ask Hopkins Psychiatry",
      link: "http://askhopkinspsychiatry.org/",
      description:
        "A resource that provides answers to common mental health questions and promotes awareness of psychiatric conditions.",
    },
    {
      name: "Mass General MADI Resource Center",
      link: "http://www.massgeneral.org/psychiatry/about/pe_home.aspx",
      description:
        "A center providing comprehensive resources for mental health information and support, including a focus on prevention and treatment.",
    },
    {
      name: "Mayo Clinic Patient Information",
      link: "http://www.mayoclinic.org/patient-care-and-health-information",
      description:
        "A trusted source for patient health information, including guidelines on mental health and wellness.",
    },
    {
      name: "Medline Plus",
      link: "https://www.medlineplus.gov/",
      description:
        "A comprehensive resource for health information, offering articles on a wide range of health topics, including mental health.",
    },
  ];

  const multicultural = [
    {
      name: "National Asian American Pacific Islander Mental Health Association - NAAPIMHA",
      link: "https://www.naapimha.org/",
      description:
        "An organization dedicated to improving the mental health and well-being of Asian American and Pacific Islander communities through advocacy, education, and resources.",
    },
    {
      name: "Asian American Psychological Association - AAPA",
      link: "https://aapaonline.org/",
      description:
        "A professional organization that promotes the understanding and development of Asian American psychology and mental health.",
    },
    {
      name: "National Latina/o Psychological Association - NLPA",
      link: "http://www.nlpa.ws/",
      description:
        "An organization focused on enhancing the mental health and well-being of the Latina/o community through research, education, and advocacy.",
    },
    {
      name: "Black Mental Health Alliance - BMHA",
      link: "http://blackmentalhealth.com/",
      description:
        "A community-based organization that provides resources and support to improve the mental health of Black individuals and families.",
    },
    {
      name: "Office of Minority Mental Health",
      link: "https://minorityhealth.hhs.gov/Default.aspx",
      description:
        "A federal office dedicated to improving the mental health of racial and ethnic minorities through policy, research, and education.",
    },
    {
      name: "Black Girl Mental Health",
      link: "https://blackgirlmentalhealth.tumblr.com/",
      description:
        "A platform that addresses the unique mental health challenges faced by Black girls and women, offering resources and support.",
    },
  ];

  return (
    <div
      data-theme="autumn"
      className="flex items-center justify-items-center w-screen h-screen bg-white pl-12 font-[family-name:var(--font-geist-sans)]"
    >
      <main className="bg-white flex flex-row gap-8 items-center sm:items-start w-full h-full overflow-y-scroll">
        <Navbar />
        <ScrollContainer>
          <div className="flex flex-col justify-center items-center w-full h-full gap-16 py-16 bg-white px-10">
            <h1 className="text-neutral font-medium text-5xl translate-x-12 self-start">
              Suicide Help
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suicideResources.map((resource, i) => (
                <div key={i} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{resource.name}</h2>
                    <p>{resource.description}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn bg-joy-pink-dark select-none"
                        onClick={() => window.open(resource.link, "_blank")}
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h1 className="text-neutral font-medium text-5xl translate-x-12 self-start">
              General
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {general.map((resource, i) => (
                <div key={i} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{resource.name}</h2>
                    <p>{resource.description}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn bg-joy-pink-dark select-none"
                        onClick={() => window.open(resource.link, "_blank")}
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h1 className="text-neutral font-medium text-5xl translate-x-12 self-start">
              Multicultural
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {multicultural.map((resource, i) => (
                <div key={i} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{resource.name}</h2>
                    <p>{resource.description}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn bg-joy-pink-dark select-none"
                        onClick={() => window.open(resource.link, "_blank")}
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollContainer>
      </main>
    </div>
  );
}
