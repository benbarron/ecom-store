import { Global, Module } from "@nestjs/common";
import { AppSearchFactory } from "./search-client.factory";

@Global()
@Module({
  providers: [AppSearchFactory],
  exports: [AppSearchFactory]
})
export class SearchModule {

}