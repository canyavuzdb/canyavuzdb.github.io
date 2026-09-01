import InlineNavigation from "./inline-navigation";
import NameSwitch from "./name-switch";
import ProfileCard from "./profile-card";

export default function HomeIntro() {
  return (
    <section className="w-full max-w-[42rem] text-left">
      <div className="mb-8 flex items-center gap-4">
        <ProfileCard />
        <div>
          <p className="text-base text-white/55">Merhaba, ben</p>
          <NameSwitch />
        </div>
      </div>
      <InlineNavigation />
    </section>
  );
}
