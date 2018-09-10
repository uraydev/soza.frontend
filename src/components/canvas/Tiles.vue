<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md8>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex md6>
                <v-layout row wrap>
                  <v-flex d-flex>
                    <slot name="slot1">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                  <v-flex d-flex>
                    <slot name="slot2">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d-flex md6>
                <slot name="slot4">
                  <tiles-slot-template :data="emptyData" />
                </slot>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex>
            <slot name="slot3">
              <tiles-slot-template :data="emptyData" />
            </slot>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <slot name="slot5">
          <tiles-slot-template :data="emptyData" />
        </slot>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <slot name="slot10">
          <tiles-slot-template :data="emptyData" />
        </slot>
      </v-flex>
      <v-flex d-flex xs12 sm6 md8>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex md6>
                <v-layout row wrap>
                  <v-flex d-flex>
                    <slot name="slot9">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                  <v-flex d-flex>
                    <slot name="slot8">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d-flex md6>
                <slot name="slot6">
                  <tiles-slot-template :data="emptyData" />
                </slot>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex>
            <slot name="slot7">
              <tiles-slot-template :data="emptyData" />
            </slot>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md8>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex md6>
                <slot name="slot11">
                  <tiles-slot-template :data="emptyData" />
                </slot>
              </v-flex>
              <v-flex d-flex md6>
                <v-layout row wrap>
                  <v-flex d-flex>
                    <slot name="slot14">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                  <v-flex d-flex>
                    <slot name="slot13">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex>
            <slot name="slot12">
              <tiles-slot-template :data="emptyData" />
            </slot>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <slot name="slot15">
          <tiles-slot-template :data="emptyData" />
        </slot>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <slot name="slot20">
          <tiles-slot-template :data="emptyData" />
        </slot>
      </v-flex>
      <v-flex d-flex xs12 sm6 md8>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex md6>
                <slot name="slot18">
                  <tiles-slot-template :data="emptyData" />
                </slot>
              </v-flex>
              <v-flex d-flex md6>
                <v-layout row wrap>
                  <v-flex d-flex>
                    <slot name="slot16">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                  <v-flex d-flex>
                    <slot name="slot17">
                      <tiles-slot-template :data="emptyData" />
                    </slot>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex>
            <slot name="slot19">
              <tiles-slot-template :data="emptyData" />
            </slot>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Article from '@/components/canvas/Article'

export default {
  data () {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      emptyData: {
        title: 'Здесь должна быть ваша карта',
        content: 'Создать',
        color: 'cyan darken2'
      }
    }
  },
  components: {
    'tiles-slot-template': Article
  }
}
</script>
