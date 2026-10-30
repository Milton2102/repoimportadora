export const routerMock = {
  push: () => {},
};

export function useRouter() {
  return routerMock;
}

export function usePathname() {
  return "/";
}
