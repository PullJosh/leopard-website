import { useRouter } from "next/router";
import { useProject } from "../../../lib/useProject";
import Title from "../../../components/Title";
import TopBorder from "../../../components/TopBorder";
import Nav, {
  NavAnonymousProjectWarning,
  NavSpace,
} from "../../../components/Nav";
import { useSession } from "../../../components/SessionProvider";
import { SeeInsideButton } from "../../../components/SeeInsideButton";
import Link from "next/link";
import { RemixIcon } from "../../../components/RemixIcon";

export default function ProjectPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const projectResponse = useProject(id);

  const { user } = useSession();

  return (
    <>
      <Title>
        {projectResponse.state === "ready"
          ? projectResponse.project.title
          : null}
      </Title>

      <div className="grid h-screen w-screen grid-rows-[auto,1fr] bg-gray-100">
        <div className="border-b border-gray-300">
          <TopBorder />
          <Nav>
            <NavSpace />
            {projectResponse.state === "ready" &&
              projectResponse.project.owner === null && (
                <NavAnonymousProjectWarning
                  className="mr-2"
                  projectId={projectResponse.project.id}
                  setProject={projectResponse.setProject}
                  autoClaimOnSignIn={true}
                />
              )}
          </Nav>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-4xl px-8">
            <div>
              <div className="mb-4 flex items-center">
                {projectResponse.state === "ready" &&
                projectResponse.project.owner ? (
                  <Link
                    href={
                      projectResponse.state === "ready"
                        ? `/users/${projectResponse.project.owner?.username}`
                        : "#"
                    }
                  >
                    <img
                      className="mr-3 h-14 w-14 self-start rounded-md"
                      src="/default-profile-picture.svg"
                      alt={
                        projectResponse.state === "ready"
                          ? `Picture of ${projectResponse.project.owner?.username}`
                          : "Default profile picture"
                      }
                    />
                  </Link>
                ) : (
                  <img
                    className="mr-3 h-14 w-14 self-start rounded-md grayscale"
                    src="/default-profile-picture.svg"
                    alt={
                      projectResponse.state === "ready"
                        ? `Picture of ${projectResponse.project.owner?.username}`
                        : "Default profile picture"
                    }
                  />
                )}
                <div className="flex-grow">
                  <h1 className="flex-grow text-2xl font-semibold">
                    {projectResponse.state === "ready"
                      ? projectResponse.project.title
                      : ""}
                  </h1>
                  <div className="text-gray-800">
                    by{" "}
                    {projectResponse.state === "ready" &&
                      (projectResponse.project.owner ? (
                        <Link
                          className="font-medium text-indigo-600 hover:underline"
                          href={`/users/${projectResponse.project.owner.username}`}
                        >
                          {projectResponse.project.owner.username}
                        </Link>
                      ) : (
                        "Anonymous"
                      ))}
                  </div>
                </div>

                <div className="ml-4 flex items-start self-start">
                  <SeeInsideButton id={id as string} />
                </div>
              </div>
              <div className="flex space-x-4">
                <iframe
                  className="flex-shrink-0 flex-grow-0 rounded-md border border-gray-300 bg-white"
                  width="480"
                  height="360"
                  src={`/api/preview/${id}/index.html`}
                />
                <div className="flex flex-grow flex-col">
                  {projectResponse.state === "ready" &&
                    projectResponse.project.scratchProjectData && (
                      <>
                        <strong className="mb-1 flex-grow-0">
                          Special Thanks
                        </strong>
                        <ul className="mb-4 text-sm">
                          <li>
                            <RemixIcon className="mr-2 inline w-5 text-gray-700" />
                            <a
                              className="font-bold text-indigo-800 hover:underline"
                              href={`https://scratch.mit.edu/projects/${projectResponse.project.scratchProjectData.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {projectResponse.project.scratchProjectData.title}
                            </a>{" "}
                            by{" "}
                            <a
                              className="font-bold text-indigo-800 hover:underline"
                              href={`https://scratch.mit.edu/users/${projectResponse.project.scratchProjectData.author.username}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                className="mr-[2px] inline-block h-[1.2em] align-text-bottom"
                                viewBox="0 0 312 498"
                              >
                                <title>Scratch User</title>
                                <g
                                  id="scratch-orange-outline"
                                  transform="matrix(1,0,0,1,-68,-70)"
                                >
                                  <path
                                    d="M379.345,386.496C379.896,427.823 361.579,468.244 329.072,497.043C301.468,521.763 266.195,535.415 229.902,535.415C223.656,535.348 217.345,534.995 211.164,534.139C209.741,536.12 208.252,538.018 206.699,539.848C192.719,556.255 173.447,565.978 152.413,567.238C150.795,567.372 149.225,567.439 147.607,567.439C106.557,567.439 72.028,534.072 68.969,491.552C68.905,490.712 68.84,489.856 68.84,488.949L68.775,488.311C67.416,458.033 68.096,433.113 68.905,417.546C69.924,399.527 70.474,368.897 70.539,362.28C70.879,341.575 78.532,322.783 90.959,308.476C84.778,286.309 82.804,259.692 86.606,228.223L87.092,223.638C87.156,223.285 87.156,222.933 87.221,222.58C89.389,204.141 92.642,176.887 106.007,150.841C125.957,111.697 162.59,89.228 206.424,89.228C208.867,89.228 211.44,89.295 214.093,89.446C218.705,89.731 223.381,90.286 227.928,91.142C242.166,77.825 261.098,69.58 281.857,70.017C324.736,70.789 359.605,107.532 359.605,151.899C359.605,152.873 355.803,271.38 353.974,281.658C352.89,288.072 351.062,294.185 348.683,299.962C368.424,323.623 379.07,353.128 379.345,386.496ZM208.175,301.929C187.836,298.638 176.979,284.515 182.367,240.82L182.998,235.547C187.529,197.578 191.331,189.131 208.936,190.122C214.081,190.458 220.019,193.833 225.941,198.888C231.443,205.488 243.659,214.035 250.536,230.962C255.471,243.389 257.17,251.5 257.882,260.216L258.966,270.913L258.966,270.862C260.422,278.184 265.827,284.196 273.302,285.506C282.93,287.336 292.217,280.686 293.9,270.694C294.126,269.502 298.479,154.42 298.479,152.54C298.479,142.397 290.648,134.168 280.81,134C271.004,133.95 263.044,142.229 263.044,152.338C263.044,152.556 262.995,168.442 262.671,184.463C248.691,168.678 230.796,154.538 210.764,153.312C157.142,150.34 151.284,201.508 147.757,230.996L147.223,236.219C139.99,294.49 158.727,331.25 202.722,338.387C250.536,346.179 282.46,357.581 282.752,388.111C282.93,399.983 276.91,412.158 266.409,421.528C253.756,432.696 236.831,437.717 220.877,434.996C215.926,434.207 211.282,432.796 206.832,431.268C200.57,427.641 184.794,417.683 176.785,406.18C170.038,396.473 167.691,381.225 166.963,371.553C167.044,367.22 167.06,364.349 167.06,364.029C167.238,353.836 159.358,345.54 149.65,345.305C139.796,345.07 131.706,353.299 131.528,363.475C131.528,363.811 131.091,399.866 129.813,421.579C127.984,456.558 129.813,486.181 129.813,487.474C130.541,497.634 138.955,505.291 148.76,504.62C158.533,504.082 165.976,495.283 165.297,485.106C165.297,484.938 164.423,470.58 164.536,450.748C177.545,459.363 194.632,467.742 214.971,471.336C241.507,475.954 268.642,467.994 289.369,449.505C307.929,433.032 318.559,410.512 318.268,387.724C317.637,319.696 243.659,307.74 208.175,301.929Z"
                                    className="fill-current"
                                  />
                                </g>
                              </svg>
                              <span>
                                {
                                  projectResponse.project.scratchProjectData
                                    .author.username
                                }
                              </span>
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                  <strong className="mb-1 flex-grow-0">Project Notes</strong>
                  <textarea
                    className="w-full flex-grow resize-none rounded-md bg-gray-200 p-4"
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
