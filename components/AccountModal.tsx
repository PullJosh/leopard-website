import { Dialog, Tab } from "@headlessui/react";
import classNames from "classnames";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import JoshPullenProfilePicture from "../public/josh-pullen-profile-picture.jpeg";
import { useSession } from "../pages/_app";
import { RegisterForm } from "./RegisterForm";
import { SignInForm } from "./SignInForm";
import { Checkbox } from "./CheckBox";

const AccountModalContext = createContext<{
  open: boolean;
  openAccountModal: (tab?: "register" | "sign-in") => void;
  closeAccountModal: () => void;
  communityGuidelinesOpen: boolean;
  setCommunityGuidelinesOpen: (open: boolean) => void;
  communityModeratorsOpen: boolean;
  setCommunityModeratorsOpen: (open: boolean) => void;
}>({
  open: false,
  openAccountModal: () => {},
  closeAccountModal: () => {},
  communityGuidelinesOpen: false,
  setCommunityGuidelinesOpen: () => {},
  communityModeratorsOpen: false,
  setCommunityModeratorsOpen: () => {},
});

export function useAccountModal() {
  const {
    open,
    openAccountModal,
    closeAccountModal,
    communityGuidelinesOpen,
    setCommunityGuidelinesOpen,
    communityModeratorsOpen,
    setCommunityModeratorsOpen,
  } = useContext(AccountModalContext);

  return {
    open,
    openAccountModal,
    closeAccountModal,
    communityGuidelinesOpen,
    setCommunityGuidelinesOpen,
    communityModeratorsOpen,
    setCommunityModeratorsOpen,
  };
}

interface AccountModalProps {
  children: React.ReactNode;
}

export default function AccountModal({ children }: AccountModalProps) {
  const [open, setOpen] = useState(false);
  const [communityGuidelinesOpen, setCommunityGuidelinesOpen] = useState(false);
  const [communityModeratorsOpen, setCommunityModeratorsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSession();

  // When the user is signed in, close the account modal
  useEffect(() => {
    console.log("User changed", user);

    if (user !== null) {
      setOpen(false);
    }
  }, [user]);

  return (
    <AccountModalContext.Provider
      value={{
        open,
        openAccountModal: (tab = "register") => {
          setOpen(true);
          setActiveTab(tab === "register" ? 0 : 1);
        },
        closeAccountModal: () => {
          setOpen(false);
        },
        communityGuidelinesOpen,
        setCommunityGuidelinesOpen,
        communityModeratorsOpen,
        setCommunityModeratorsOpen,
      }}
    >
      {children}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="fixed inset-0 z-50 flex w-screen flex-col items-center justify-center bg-gray-900/40 p-4">
          <Dialog.Panel className="flex w-full max-w-sm flex-shrink flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
              <div className="flex bg-gray-300">
                <Tab.List className="flex flex-grow">
                  {["Register", "Sign In"].map((tabName) => (
                    <Tab
                      key={tabName}
                      className={({ selected }) =>
                        classNames("flex-grow rounded-t-lg px-4 py-2", {
                          "bg-white": selected,
                          "hover:bg-gray-200": !selected,
                        })
                      }
                    >
                      {tabName}
                    </Tab>
                  ))}

                  <div
                    className={classNames("-ml-px border-l", {
                      "border-gray-400": activeTab < 1,
                      "border-transparent": activeTab === 1,
                    })}
                  />

                  <button
                    className="group m-2 h-8 w-8 rounded"
                    onClick={() => setOpen(false)}
                  >
                    <svg className="h-8 w-8" viewBox="0 0 32 32">
                      <line
                        x1="8"
                        y1="8"
                        x2="24"
                        y2="24"
                        className="stroke-gray-600 group-hover:stroke-gray-700 group-focus:stroke-gray-700 group-active:stroke-gray-900"
                        strokeLinecap="round"
                        strokeWidth={3}
                        fill="none"
                      />
                      <line
                        x1="8"
                        y1="24"
                        x2="24"
                        y2="8"
                        className="stroke-gray-600 group-hover:stroke-gray-700 group-focus:stroke-gray-700 group-active:stroke-gray-900"
                        strokeLinecap="round"
                        strokeWidth={3}
                        fill="none"
                      />
                    </svg>
                  </button>
                </Tab.List>
              </div>
              <Tab.Panels className="overflow-auto">
                <Tab.Panel className="p-8">
                  <Dialog.Title className="text-center text-lg font-bold">
                    Create a Leopard account
                  </Dialog.Title>
                  <div className="mx-auto mt-2 mb-4 h-1 w-12 bg-indigo-600" />

                  <RegisterForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                  />
                </Tab.Panel>
                <Tab.Panel className="p-8">
                  <Dialog.Title className="text-center text-lg font-bold">
                    Sign in to Leopard
                  </Dialog.Title>
                  <div className="mx-auto mt-2 mb-4 h-1 w-12 bg-indigo-600" />

                  <SignInForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>

      <CommunityGuidelinesModal />
      <CommunityModeratorsModal />
    </AccountModalContext.Provider>
  );
}

export function CommunityGuidelinesModal() {
  const { communityGuidelinesOpen } = useAccountModal();

  const goals = [
    "We treat each other with respect, kindness, and understanding",
    "We are here to learn and grow together",
  ];

  const rules = [
    "Be appropriate for all users ages 13+",
    "Be kind & supportive",
  ];

  const [checkedList, setCheckedList] = useState(() =>
    new Array(goals.length + rules.length).fill(false),
  );
  const setChecked = useCallback((index: number, checked: boolean) => {
    setCheckedList((list) => [
      ...list.slice(0, index),
      checked,
      ...list.slice(index + 1),
    ]);
  }, []);

  return (
    <Dialog open={communityGuidelinesOpen} onClose={() => {}}>
      <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-gray-900/40 p-4">
        <Dialog.Panel className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="p-8">
            <Dialog.Title className="text-center text-lg font-bold">
              Community Guidelines
            </Dialog.Title>
            <div className="mx-auto mt-2 h-1 w-12 bg-indigo-600" />

            <Dialog.Description className="mt-4 text-sm text-gray-700">
              Our community is a place for Scratchers to learn JavaScript and
              web development.
            </Dialog.Description>

            <h3 className="mt-4 font-bold text-gray-900">Community Goals</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              {goals.map((goal, i) => (
                <li key={i}>
                  <label className="group flex cursor-pointer">
                    <Checkbox
                      checked={checkedList[i]}
                      onChange={(event) =>
                        setChecked(i, event.currentTarget.checked)
                      }
                    />
                    <span className="peer-checked:text-gray-700">{goal}</span>
                  </label>
                </li>
              ))}
            </ul>

            <h3 className="mt-4 font-bold text-gray-900">Do's and Don'ts</h3>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Everthing you share & post must...
            </p>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {rules.map((rule, i) => (
                <li key={i}>
                  <label className="group flex cursor-pointer">
                    <Checkbox
                      checked={checkedList[goals.length + i]}
                      onChange={(event) =>
                        setChecked(
                          goals.length + i,
                          event.currentTarget.checked,
                        )
                      }
                    />
                    <span className="peer-checked:text-gray-700">{rule}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between space-x-4">
              <button className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 active:bg-gray-400">
                Sign out
              </button>
              <button
                disabled={checkedList.some((c) => c === false)}
                className="rounded bg-indigo-600 px-4 py-2 text-white enabled:hover:bg-indigo-700 enabled:active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                I agree
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export function CommunityModeratorsModal() {
  const { communityModeratorsOpen, setCommunityModeratorsOpen } =
    useAccountModal();

  return (
    <Dialog open={communityModeratorsOpen} onClose={() => {}}>
      <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-gray-900/40 p-4">
        <Dialog.Panel className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="p-8">
            <Dialog.Title className="text-center text-lg font-bold">
              Community Moderators
            </Dialog.Title>
            <div className="mx-auto mt-2 h-1 w-12 bg-indigo-600" />

            <Dialog.Description className="mt-4 text-sm text-gray-700">
              Get to know your moderators! They are the people who enforce the
              community guidelines.
            </Dialog.Description>

            <div className="-mx-8 my-4 bg-gray-200 px-8 py-4">
              <div className="rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 flex-grow-0">
                    <Image
                      layout="intrinsic"
                      className="rounded"
                      src={JoshPullenProfilePicture}
                      placeholder="blur"
                      alt="Josh Pullen"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      Josh Pullen
                    </div>
                    <span className="text-gray-700">
                      <span>@PullJosh</span>{" "}
                      <span className="rounded bg-indigo-200 px-1 py-px text-sm font-medium text-indigo-900">
                        Admin
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p>
                    👋 Hi! I'm PullJosh. I'm a high school math teacher in the
                    United States.
                  </p>
                  <p>
                    I created Leopard because I know that transitioning from
                    Scratch to JavaScript can be hard–I used to struggle myself.
                  </p>
                  <p>
                    Now I am maintaining Leopard and growing the community,
                    helping more people level up their coding skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
