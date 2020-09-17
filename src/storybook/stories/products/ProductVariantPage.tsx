import placeholderImage from "@assets/images/placeholder60x60.png";
import { ProductErrorCode } from "@saleor/types/globalTypes";
import { warehouseList } from "@saleor/warehouses/fixtures";
import { storiesOf } from "@storybook/react";
import React from "react";

import ProductVariantPage from "../../../products/components/ProductVariantPage";
import { variant as variantFixture } from "../../../products/fixtures";
import Decorator from "../../Decorator";

const variant = variantFixture(placeholderImage);

storiesOf("Views / Products / Product variant details", module)
  .addDecorator(Decorator)
  .add("when loaded data", () => (
    <ProductVariantPage
      header={variant.name || variant.sku}
      errors={[]}
      channelErrors={[]}
      variant={variant}
      onAdd={() => undefined}
      onBack={() => undefined}
      onDelete={undefined}
      onImageSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantClick={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
    />
  ))
  .add("when loading data", () => (
    <ProductVariantPage
      header={undefined}
      errors={[]}
      channelErrors={[]}
      loading={true}
      onBack={() => undefined}
      placeholderImage={placeholderImage}
      onAdd={() => undefined}
      onDelete={undefined}
      onImageSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantClick={() => undefined}
      saveButtonBarState="default"
      warehouses={warehouseList}
    />
  ))
  .add("attribute errors", () => (
    <ProductVariantPage
      header={variant.name || variant.sku}
      variant={variant}
      onAdd={() => undefined}
      onBack={() => undefined}
      onDelete={undefined}
      onImageSelect={() => undefined}
      onSubmit={() => undefined}
      onVariantClick={() => undefined}
      saveButtonBarState="default"
      errors={[
        {
          code: ProductErrorCode.REQUIRED,
          field: "attributes"
        },
        {
          code: ProductErrorCode.UNIQUE,
          field: "attributes"
        },
        {
          code: ProductErrorCode.ALREADY_EXISTS,
          field: "sku"
        }
      ].map(error => ({
        __typename: "ProductError",
        message: "Generic form error",
        ...error
      }))}
      channelErrors={[
        {
          __typename: "ProductChannelListingError",
          channels: ["Q2hhbm5lbDox"],
          code: ProductErrorCode.INVALID,
          field: "price",
          message: "Product price cannot be lower than 0."
        }
      ]}
      warehouses={warehouseList}
    />
  ));
