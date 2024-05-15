"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { useAccountModal } from "./AccountModal";
import { useSession } from "../components/SessionProvider";
import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { RemixIcon } from "./RemixIcon";
import { ErrorIcon } from "./icons/ErrorIcon";
import { useRouter } from "next/navigation";
import { ProjectTitleEditor } from "./ProjectTitleEditor";

interface NavProps {
  width?: "default" | "full";
  title?: string | null;
  titleHref?: string;
  children?: React.ReactNode;
}

const NavContext = createContext<{
  width: "default" | "full";
}>({ width: "default" });

export default function Nav({
  width = "default",
  title = null,
  titleHref = "/",
  children = <NavSpace />,
}: NavProps) {
  return (
    <NavContext.Provider value={{ width }}>
      <header className="flex h-16 justify-start bg-white">
        <div
          className={classNames("mx-auto flex w-full justify-start", {
            "max-w-4xl px-8": width === "default",
            "px-2": width === "full",
          })}
        >
          {title && titleHref === "/" ? (
            // The Leopard logo always links to the home page. If the page title
            // also links to the homepage, combine them into one link.
            <Link
              href="/"
              className="mr-4 flex items-center space-x-3 hover:underline"
            >
              <img
                className="my-2 h-12 w-12"
                src="/leopard-logo.svg"
                alt="Leopard logo"
              />
              {title && <h1 className="text-lg font-semibold">{title}</h1>}
            </Link>
          ) : (
            // ...Otherwise, render the logo and title as separate links.
            <>
              <Link
                href="/"
                className="mr-4 flex items-center space-x-3 hover:underline"
              >
                <img
                  className="my-2 h-12 w-12"
                  src="/leopard-logo.svg"
                  alt="Leopard logo"
                />
              </Link>
              {title && (
                <Link
                  href={titleHref}
                  className="flex items-center hover:underline"
                >
                  <h1 className="text-lg font-semibold">{title}</h1>
                </Link>
              )}
            </>
          )}

          {children}

          <NavUserInfo />
        </div>
      </header>
    </NavContext.Provider>
  );
}

export function NavSpace() {
  return <div className="flex-grow" />;
}

interface NavProjectDescriptionProps {
  id: string;
  title: string;
  remixSource?: {
    type: "scratch";
    id: string;
    title: string;
    username: string;
  };
  owner: {
    id: string;
    username: string;
  } | null;
}

export function NavProjectDescription({
  id,
  title,
  remixSource,
  owner,
}: NavProjectDescriptionProps) {
  const { user } = useSession();

  return (
    <div className="flex flex-col items-start self-center">
      <div className="text-lg">
        {!!user && owner?.id === user.id ? (
          <h1 className="inline font-semibold">
            <ProjectTitleEditor
              projectId={id}
              defaultTitle={title}
              editable={true}
              size="small"
              autoSize={true}
            />
          </h1>
        ) : (
          <Link href={`/projects/${id}`} className="hover:underline">
            <h1 className="inline font-semibold">{title}</h1>
          </Link>
        )}
        {owner && (
          <>
            {" "}
            by{" "}
            <Link href={`/users/${owner.username}`} className="hover:underline">
              {owner.username}
            </Link>
          </>
        )}
      </div>
      {remixSource && (
        <div className="text-xs">
          <RemixIcon className="mr-2 inline w-4 text-gray-600" />
          <a
            className="font-bold text-indigo-800 hover:underline"
            href={`https://scratch.mit.edu/projects/${remixSource.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {remixSource.title}
          </a>{" "}
          by{" "}
          <a
            className="font-bold text-indigo-800 hover:underline"
            href={`https://scratch.mit.edu/users/${remixSource.username}`}
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
            <span>{remixSource.username}</span>
          </a>
        </div>
      )}
    </div>
  );
}

interface NavAnonymousProjectWarningProps {
  projectId: string;
  setProject?: (project: any) => void;
  autoClaimOnSignIn?: boolean;
  className?: string;
}

export function NavAnonymousProjectWarning({
  projectId,
  setProject,
  autoClaimOnSignIn = false,
  className,
}: NavAnonymousProjectWarningProps) {
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (user && autoClaimOnSignIn && !loading && error === null) {
      setLoading(true);
      fetch(`/api/projects/${projectId}/claim`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => {
          const project = res.project;
          if (setProject) {
            setProject(project);
          } else {
            router.refresh();
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Error: Failed to claim project");
          setLoading(false);
          setError(err);
        });
    }
  }, [autoClaimOnSignIn, error, loading, projectId, router, setProject, user]);

  return (
    <div
      className={classNames(
        "flex h-10 items-center space-x-3 self-center rounded-md bg-yellow-300 px-3 py-1",
        className,
      )}
    >
      <ErrorIcon className="h-5 w-5 text-yellow-800" />
      <div className="text-left text-sm">
        <div className="text-yellow-800">
          Project will be deleted after 24h. Sign in to save.
        </div>
      </div>
    </div>
  );
}

export function NavUserInfo() {
  const { user, setUser } = useSession();

  const { openAccountModal } = useAccountModal();
  const { width } = useContext(NavContext);

  if (!user) {
    return (
      <div
        className={classNames("flex items-center space-x-2", {
          "mr-3": width === "full",
        })}
      >
        <button
          onClick={() => openAccountModal("register")}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 active:bg-indigo-800"
        >
          Register
        </button>
        <button
          onClick={() => openAccountModal("sign-in")}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 active:bg-gray-500"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex py-2">
      <Menu>
        <MenuButton
          className={({ open }) =>
            classNames("flex items-center rounded-lg p-2", {
              "hover:bg-gray-200 focus-visible:bg-gray-200": !open,
              "bg-gray-300": open,
            })
          }
        >
          <img
            className="mr-3 h-8 w-8 rounded"
            src="/default-profile-picture.svg"
            alt={`Picture of ${user.username}`}
          />
          <div className="text-gray-800">{user.username}</div>
          <svg className="ml-3 mr-1 w-[16px]" viewBox="0 0 16 9">
            <polyline
              points="1 1, 8 8, 15 1"
              className="stroke-gray-600"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              fill="none"
            />
          </svg>
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="z-50 flex w-48 flex-col divide-y overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg [--anchor-gap:0.25rem]"
        >
          <NavUserInfoGroup>
            <NavUserInfoMenuItem
              onClick={`/users/${user.username}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              }
            >
              Profile
            </NavUserInfoMenuItem>
            <NavUserInfoMenuItem
              onClick="/mystuff"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              }
            >
              My Stuff
            </NavUserInfoMenuItem>
          </NavUserInfoGroup>
          {user.role === "ADMIN" && (
            <NavUserInfoGroup>
              <NavUserInfoMenuItem
                onClick="/admin"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                }
              >
                Admin
              </NavUserInfoMenuItem>
            </NavUserInfoGroup>
          )}
          <NavUserInfoGroup>
            <NavUserInfoMenuItem
              onClick={() => {
                fetch("/api/sign-out")
                  .then((res) => res.json())
                  .then((res) => setUser(res.user));
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Sign Out
            </NavUserInfoMenuItem>
          </NavUserInfoGroup>
        </MenuItems>
      </Menu>
    </div>
  );
}

interface NavUserInfoGroupProps {
  children: React.ReactNode;
}

function NavUserInfoGroup({ children }: NavUserInfoGroupProps) {
  return <div className="flex flex-col p-2">{children}</div>;
}

type NavUserInfoMenuItemProps = {
  children: string;
  icon?: React.ReactNode;
  onClick?: (() => void) | string;
};

function NavUserInfoMenuItem({
  children,
  icon,
  onClick,
}: NavUserInfoMenuItemProps) {
  const sharedClassNames =
    "flex items-center justify-start space-x-2 rounded px-2 py-2 text-left enabled:text-gray-800 disabled:cursor-default disabled:text-gray-500 data-[focus]:bg-gray-200";

  const disabled = onClick === undefined;

  if (typeof onClick === "string") {
    const href = onClick;
    return (
      <MenuItem disabled={disabled} as={Fragment}>
        <Link href={href} className={sharedClassNames}>
          <div>{icon}</div>
          <div>{children}</div>
        </Link>
      </MenuItem>
    );
  } else {
    return (
      <MenuItem disabled={disabled}>
        {({ disabled }) => (
          <button
            disabled={disabled}
            onClick={onClick}
            className={sharedClassNames}
          >
            <div>{icon}</div>
            <div>{children}</div>
          </button>
        )}
      </MenuItem>
    );
  }
}
