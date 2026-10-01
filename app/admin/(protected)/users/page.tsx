import { PlaceholderPage } from "@/components/admin/placeholder-page";

export default function UsersAdminPage() {
  return (
    <PlaceholderPage
      title="Users"
      description="Manage administrator and editor accounts."
      list={[
        "Invite new admin / editor",
        "Edit user roles",
        "Disable accounts",
        "View last login",
      ]}
    />
  );
}
