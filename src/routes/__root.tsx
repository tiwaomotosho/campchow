import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModal } from "@/components/AuthModal";
import { SplashScreen } from "@/components/SplashScreen";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

/* Inline SVG favicon — no external file needed */
const FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%231A6B3C'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='system-ui'>🛒</text></svg>`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "CampChow — Food. Delivered Anywhere on the Camp." },
      { name: "description", content: "CampChow is a three-sided food ordering and last-mile delivery platform for Redemption City." },
      { name: "theme-color", content: "#1A6B3C" },
      { property: "og:title", content: "CampChow — Food. Delivered Anywhere on the Camp." },
      { property: "og:description", content: "CampChow is a three-sided food ordering and last-mile delivery platform for Redemption City." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CampChow — Food. Delivered Anywhere on the Camp." },
      { name: "twitter:description", content: "CampChow is a three-sided food ordering and last-mile delivery platform for Redemption City." },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2b1e6bc8-7834-4032-938c-cf4e277555a9/id-preview-32ad970f--0c80a80e-e09f-498a-bd43-eea921c3d9f3.lovable.app-1780041865390.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: FAVICON, type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Runs before paint: applies saved/OS theme to <html> (no flash) and paints a
// full-screen blocking layer in the page background colour so the splash is the
// very first thing on screen — before the bundle hydrates.
const PRE_PAINT = `
(function(){
  try {
    var t = localStorage.getItem('cc-theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
  try {
    if (!sessionStorage.getItem('cc-splash-seen')) {
      var d = document.createElement('div');
      d.id = 'cc-pre-splash';
      d.style.cssText = 'position:fixed;inset:0;z-index:300;background:var(--color-background,#0c0f0d);';
      var add = function(){ if(document.body){ document.body.appendChild(d); } else { requestAnimationFrame(add); } };
      add();
    }
  } catch(e) {}
})();
`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Outlet />
          <AuthModal />
          <SplashScreen />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
