export default function GettingStarted() {
  return (
    <main className="p-8 font-sans text-center">
      <h1 className="text-3xl font-bold mb-2">Getting Started</h1>
      <p className="mb-6">
        Thank you so much for using Arclify! Follow these steps to setup Arclify
        for your Discord server(s):
      </p>
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold">
            Add Arclify&apos;s Discord bot into your server
          </h2>
          <p className="text-md font-regular mx-auto mt-2 max-w-md">
            Arclify is currently in closed beta. You can request free access by
            emailing me at arclify.dev@gmail.com!
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">
            Ensure that the bot is above the members you want to manage in the
            role heirarchy
          </h2>
          <p className="text-md font-regular mx-auto mt-2 max-w-lg text-center">
            Don&apos;t worry! The Discord bot&apos;s permissions are set to be
            as minimal as possible for Arclify to work. Features like renaming
            members can only be done by the app if it&apos;s above the user in
            the role hierarchy.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">
            Log into Arclify with your Discord account
          </h2>
          <p className="text-md font-regular mx-auto mt-2 max-w-lg text-center">
            Arclify does not store or access your Discord login credentials at
            any time. Your Discord login is solely used to authenticate your
            access to the app. I respect the security and privacy of your
            information!
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Enter the the dashboard</h2>
          <p className="text-md font-regular mx-auto mt-2 max-w-lg text-center">
            Enjoy! Please note that some features are still in development and
            may have some bugs. If you encounter any issues, please report them
            to me by sending an email to arclify.dev@gmail.com
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Contact</h2>
          <p className="text-md font-regular mx-auto mt-2 max-w-lg text-center">
            arclify.dev@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}
