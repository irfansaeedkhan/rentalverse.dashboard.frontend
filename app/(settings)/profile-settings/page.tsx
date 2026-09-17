import React, { Suspense } from "react";
import { RenderedPage } from "@/components/settings";

const ProfileSettings = () => {
  return (
    <Suspense>
      <RenderedPage />
    </Suspense>
  );
};

export default ProfileSettings;
