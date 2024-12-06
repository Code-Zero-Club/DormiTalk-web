import AccountInfo from "../_components/AccountInfo";
import AdditionalSettings from "../_components/AdditionalSettings";
import AppInfo from "../_components/AppInfo";

export default function SettingContentView() {
  return (
    <main className="h-full flex flex-col items-center px-5 py-4 gap-8">
      <AccountInfo />
      <AdditionalSettings />
      <AppInfo />
    </main>
  );
}
