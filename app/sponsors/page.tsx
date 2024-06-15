import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Center from "../../components/Center";
import Nav from "../../components/Nav";
import { UnscrapableEmailLink } from "../../components/UnscrapableEmailLink";
import { sponsors } from "./sponsors";

export default function SponsorsPage() {
  return (
    <>
      <div className="sticky top-[8px] z-30 border-b border-gray-300">
        <Nav title="Sponsors" titleHref="/sponsors" />
      </div>
      <div className="my-8">
        <Center>
          <h1 className="mb-4 text-3xl font-semibold">Sponsors</h1>
          <p>
            Leopard is made possible by generous support from the following
            sponsors and donors. If you would like to support Leopard, please
            consider{" "}
            <a
              href="https://www.patreon.com/bePatron?u=128069536"
              className="text-indigo-700 hover:underline"
            >
              donating on Patreon
            </a>{" "}
            or{" "}
            <UnscrapableEmailLink
              base64EncodedEmail="Sm9zaFB1bGxlbjI3QGdtYWlsLmNvbQ=="
              subject="Leopard Sponsorship Inquiry"
              className="text-indigo-700 hover:underline"
            >
              reaching out
            </UnscrapableEmailLink>{" "}
            about sponsorship.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {sponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.name}
                name={sponsor.name}
                url={sponsor.url}
                logo={sponsor.logo}
                cover={sponsor.cover}
                supportDescription={sponsor.supportDescription}
              >
                {sponsor.description}
              </SponsorCard>
            ))}
          </div>
        </Center>
      </div>
    </>
  );
}

interface SponsorCardProps {
  name: string;
  url: string;
  logo: React.ReactNode;
  cover: StaticImageData;
  children: React.ReactNode;
  supportDescription?: React.ReactNode;
}

function SponsorCard({
  name,
  url,
  logo,
  cover,
  children,
  supportDescription,
}: SponsorCardProps) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md">
      <Image src={cover} alt="" />
      <div className="relative p-6">
        <div className="absolute -top-12 right-6 h-24 w-24 overflow-hidden rounded-full bg-white p-4 text-gray-900">
          {logo}
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">{name}</h2>
        <div className="space-y-2 text-sm text-gray-700">{children}</div>
        <div className="mt-4 flex">
          <Link
            href={url}
            className="block rounded-md bg-indigo-700 px-4 py-2 text-sm text-white hover:bg-indigo-800 active:bg-indigo-900"
          >
            Visit website
          </Link>
        </div>
      </div>
      {supportDescription && (
        <div className="bg-gray-100 p-6">
          <div className="space-y-2 text-sm text-gray-700">
            {supportDescription}
          </div>
        </div>
      )}
    </section>
  );
}
