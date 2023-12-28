import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "components/ui/button"
import FieldRoute, { FieldRouteProps } from "./FieldRoute"
import { Box } from "components/ui/box"
import { Separator } from "components/ui/separator"
import { Label } from "components/ui/label"
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons"
import { Icon } from "components/ui/icon"
import { Card, CardAction, CardContent } from "components/ui/card"

interface VectorProps extends FieldRouteProps {}

const Vector: React.FC<VectorProps> = ({
  methodField,
  errors,
  registerName
}) => {
  const { control } = useFormContext()

  const { fields, append, swap, remove } = useFieldArray({
    control,
    name: registerName as never
  })

  return (
    <Box className="mb-2">
      <div className="flex justify-between items-center">
        <Label className="flex-1 w-full block text-lg font-medium">
          {methodField.label}
        </Label>
        <Button onClick={() => append("")} asIconButton>
          <PlusIcon />
        </Button>
      </div>
      {fields.length > 0 && <Separator className="my-2" />}
      {fields.map((item, index) => (
        <div key={item.id} className="relative mb-1">
          <CardAction
            title={methodField.label}
            icon={
              <Icon color="primary" roundSide="tl">
                {index + 1}
              </Icon>
            }
          >
            <Box className="flex">
              <div className="flex">
                {index !== 0 && (
                  <Button
                    onClick={() => swap(index, index - 1)}
                    color="secondary"
                    asIconButton
                    roundSide="none"
                  >
                    ↑
                  </Button>
                )}
                {index !== fields.length - 1 && (
                  <Button
                    onClick={() => swap(index, index + 1)}
                    color="info"
                    roundSide="none"
                    asIconButton
                  >
                    ↓
                  </Button>
                )}
              </div>
              <Button
                onClick={() => remove(index)}
                roundSide="tr"
                asIconButton
                noShadow
                color="error"
              >
                <Cross1Icon />
              </Button>
            </Box>
          </CardAction>
          <Card
            key={item.id}
            noShadow
            color="primary"
            border={0}
            className="border-2 border-t-0"
            margin="none"
            round="b"
          >
            <CardContent>
              <FieldRoute
                methodField={methodField.fields?.[0]}
                errors={errors?.[index as never]}
                registerName={`${registerName}.[${index}]`}
              />
            </CardContent>
          </Card>
        </div>
      ))}
    </Box>
  )
}

export default Vector
