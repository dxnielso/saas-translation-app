import { generatePortalLink } from "@/actions/generatePortalLink";

function ManageAccountButton() {
  return (
    <form action={generatePortalLink}>
      <button type="submit">Administrar plan</button>
    </form>
  );
}

export default ManageAccountButton;
