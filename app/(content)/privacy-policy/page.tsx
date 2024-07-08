import Center from "../../../components/Center";
import { UnscrapableEmailLink } from "../../../components/UnscrapableEmailLink";

export default function PrivacyPolicyPage() {
  return (
    <div className="my-8">
      <Center>
        <h1 className="mb-1 text-3xl font-semibold">Privacy Policy</h1>
        <div className="mb-6 text-sm italic text-gray-700">
          Last updated: <time>June 25th, 2024</time>
        </div>
        <div className="prose prose-sm sm:prose-base">
          <div className="relative flex gap-4 rounded-2xl border border-dashed border-indigo-200 bg-indigo-100 p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="mt-1 size-6 flex-shrink-0 fill-black"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>

            <div>
              <h2 className="!mt-0">Leopard protects your privacy.</h2>
              <p>
                <strong>We don't want your private information.</strong> No,
                really. We only store what is absolutely necessary. Anything
                else is a safety risk for you and a liability for us.
              </p>
              <p>
                <strong>We provide complete transparency.</strong> The policy
                below describes exactly what we gather and why, and our code is
                open source so you can see 100% of what we do.
              </p>
              <p className="!mb-0">
                <strong>We fund Leopard through donations.</strong> Leopard
                isn't in the business of selling your personal information. We
                bring in money when people trust us and want to support our
                work, so our incentives are aligned with yours.
              </p>
            </div>
          </div>

          <div className="mt-8 grid items-start gap-8 sm:grid-cols-2">
            <div className="flex gap-4 rounded-xl border border-dashed border-gray-400 bg-gray-200 p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="mt-1 size-6 flex-shrink-0 fill-black"
              >
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
              </svg>
              <p className="!my-0">
                <strong>Questions or concerns?</strong> If you have questions or
                comments about this privacy policy, you can{" "}
                <UnscrapableEmailLink base64EncodedEmail="Sm9zaFB1bGxlbjI3QGdtYWlsLmNvbQ==">
                  email us
                </UnscrapableEmailLink>
                .
              </p>
            </div>
            <div className="text-sm text-gray-700">
              <p className="!mt-0">
                This privacy policy for Leopard ("we", "us", "our") describes
                how and why we collect, store, and/or share ("gather", "use",
                "collect", "process") your information when you use our services
                ("Leopard"), such as when you visit our website at
                leopardjs.com.
              </p>
              <p className="!mb-0">
                If you do not agree with our policies and practices, please do
                not use Leopard.
              </p>
            </div>
          </div>

          <h2>What information does Leopard gather?</h2>
          <p>
            To protect your privacy, Leopard avoids gathering unnecessary
            information about you. We only collect personal information that you
            provide to us directly, and we only collect what we absolutely need
            to make the website function.
          </p>
          <div className="grid space-y-4 sm:space-y-0 md:grid-cols-2 md:divide-x-2 md:divide-gray-300">
            <div className="md:pr-8">
              <h3 className="mb-0 mt-0">Public information</h3>
              <p className="lead text-base">
                This information will appear publicly on Leopard. Only submit
                things that can be seen by everyone.
              </p>
              <ul className="mb-0">
                <li>
                  <strong>Your username:</strong> Everyone can see this. It is
                  used to identify you.
                </li>
                <li>
                  <strong>Projects you create:</strong> Projects you create and
                  share are visible to the whole world. We do our best to ensure
                  that your private projects are visible only to you, but we do
                  rely on external providers to host your content.
                </li>
                <li>
                  <strong>Comments and messages you send:</strong> Your comments
                  and messages on Leopard are public to the whole world.
                </li>
                <li>
                  <strong>Public interactions:</strong> When you interact with
                  users or content on Leopard, other people may see those
                  interactions.
                </li>
              </ul>
            </div>
            <div className="md:pl-8">
              <h3 className="mb-0 mt-0">Private information</h3>
              <p className="lead text-base">
                This information will never be shared. However, it may be used
                by the Leopard core team for the purposes of making Leopard work
                or responding to your requests.
              </p>
              <ul className="mb-0">
                <li>
                  <strong>Email addresses:</strong> Used to verify your identity
                  (which helps prevent spam) and contact you
                </li>
                <li>
                  <strong>Password:</strong> Securely hashed so that nobody has
                  access to your password, including us.
                </li>
                <li>
                  <strong>Birthday month & year:</strong> Used to provide
                  age-appropriate safety features.
                </li>
              </ul>
            </div>
          </div>
          <h2>Why is Leopard allowed to use my information?</h2>
          <p>
            Using information is only legal if it done for legitimate reasons.
            Leopard's legal basis for most information processing is called
            "legitimate interest", which means that we are using your
            information responsibly, in ways that you would reasonably expect
            based on the service we perform.
          </p>
          <p>
            Leopard also reserves the right to use your information if you
            explicitly opt-in or if we are required to by law.
          </p>
          <h2>Does Leopard share my information?</h2>
          <p>
            No. Some of your information appears publicly on the website, as
            described above, but we do not share any of your private information
            with anyone outside of our core team (as described in the "private
            information" section above).
          </p>
          <p>
            Like the vast majority of online services, we do use third party
            providers to store your information. We store almost all of your
            information on servers provided by Amazon Web Services, and our web
            traffic is routed through Vercel.
          </p>

          <h2>What are my rights? How can I have my information deleted?</h2>
          <p>
            If you wish, you can{" "}
            <UnscrapableEmailLink base64EncodedEmail="Sm9zaFB1bGxlbjI3QGdtYWlsLmNvbQ==">
              contact us
            </UnscrapableEmailLink>{" "}
            to request a copy of your information or to request that your
            information be deleted.
          </p>
          <p>
            Anything you permanently delete on Leopard is immediately removed
            from our database. However, we may retain backups of our database
            for up to 30 days for the purposes of disaster recovery.
          </p>

          <h2>Updates to this policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated
            version will be indicated by the "last updated" date at the top of
            the policy.
          </p>
          <p>
            If we make material changes to this privacy policy, we will notify
            you either by prominantly displaying a notice on the Leopard website
            or by contacting you directly via email.
          </p>
        </div>
      </Center>
    </div>
  );
}
