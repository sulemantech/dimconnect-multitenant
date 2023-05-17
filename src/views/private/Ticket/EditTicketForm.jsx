import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { Button, TextInput } from "@mantine/core";
import React from "react";
export default ({ data }) => {
  {
    /*
            {
                "id": 1,
                "value": "Tiger Nixon",
                "msg": "System Architect",
                "path": "Edinburgh",
                "location": "61"
            }
            */
  }

  const form = useForm({
    initialValues: data,

    validate: {
      // value should be text and required
      value: (value) => value.trim().length > 0,
      // msg should be text and required
      msg: (value) => value.trim().length > 0,
      // path should be text and required
      path: (value) => value.trim().length > 0,
      // location should be text and required
      location: (value) => value.trim().length > 0,
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Value"
          placeholder="Enter Value"
          required
          error={form.errors.value && "Value is required"}
          value={form.values.value}
          onChange={(event) =>
            form.setFieldValue("value", event.currentTarget.value)
          }
        />
        <TextInput
          label="Message"
          placeholder="Enter Message"
          required
          error={form.errors.msg && "Message is required"}
          value={form.values.msg}
          onChange={(event) =>
            form.setFieldValue("msg", event.currentTarget.value)
          }
        />
        <TextInput
          label="Path"
          placeholder="Enter Path"
          required
          error={form.errors.path && "Path is required"}
          value={form.values.path}
          onChange={(event) =>
            form.setFieldValue("path", event.currentTarget.value)
          }
        />
        <TextInput
          label="Location"
          placeholder="Enter Location"
          required
          error={form.errors.location && "Location is required"}
          value={form.values.location}
          onChange={(event) =>
            form.setFieldValue("location", event.currentTarget.value)
          }
        />
        <div className="flex flex-row justify-evenly">
          <Button
            className="
                        mt-4

                            bg-[#0071b9]
                        "
            type="submit"
          >
            Update
          </Button>
          <Button
            className="
                        mt-4
                        bg-[#0071b9]
                        "
            onClick={() => closeAllModals()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
