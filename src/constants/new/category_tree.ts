import type { CategoryTree } from '@/types/new/server_config_schema';

// cascaderTree
export const categoryTree: CategoryTree = {
  aroma: [
    {
      id: 1,
      label: '꽃',
      children: [
        {
          id: 1,
          label: '화이트 플라워',
          children: [
            { id: 1, label: '자스민', value: 'aroma_floral_white_jasmine' },
            { id: 2, label: '백합', value: 'aroma_floral_white_lily' },
            { id: 3, label: '박하', value: 'aroma_floral_white_mint' },
            { id: 4, label: '민들레', value: 'aroma_floral_white_dandelion' },
            { id: 5, label: '동백', value: 'aroma_floral_white_camellia' },
          ],
        },
        {
          id: 2,
          label: '장미',
          children: [
            { id: 1, label: '에덴', value: 'aroma_floral_rose_eden' },
            { id: 2, label: '아이스버그', value: 'aroma_floral_rose_iceberg' },
            { id: 3, label: '엘', value: 'aroma_floral_rose_elle' },
            { id: 4, label: '센티멘털', value: 'aroma_floral_rose_scentimental' },
            { id: 5, label: '로열', value: 'aroma_floral_rose_royal' },
          ],
        },
        {
          id: 3,
          label: '자스민',
          children: [
            {
              id: 1,
              label: '아라비안 자스민',
              value: 'aroma_floral_jasmine_arabian',
            },
            { id: 2, label: '그랜드 자스민', value: 'aroma_floral_jasmine_grand' },
            {
              id: 3,

              label: '피카케 자스민',
              value: 'aroma_floral_jasmine_pikake',
            },
            { id: 4, label: '화이트 자스민', value: 'aroma_floral_jasmine_white' },
            { id: 5, label: '사라 자스민', value: 'aroma_floral_jasmine_sara' },
          ],
        },
        {
          id: 4,

          label: '플라워',
          children: [
            { id: 1, label: '라벤더', value: 'aroma_floral_flower_lavender' },
            { id: 2, label: '프리지아', value: 'aroma_floral_flower_freesia' },
            { id: 3, label: '아이리스', value: 'aroma_floral_flower_iris' },
            { id: 4, label: '라일락', value: 'aroma_floral_flower_lilac' },
            { id: 5, label: '데이지', value: 'aroma_floral_flower_daisy' },
          ],
        },
        {
          id: 5,

          label: '허벌·그린',
          children: [
            { id: 1, label: '민트', value: 'aroma_floral_green_mint' },
            { id: 2, label: '로즈메리', value: 'aroma_floral_green_rosemary' },
            { id: 3, label: '세이지', value: 'aroma_floral_green_sage' },
            { id: 4, label: '바질', value: 'aroma_floral_green_basil' },
            { id: 5, label: '유칼립투스', value: 'aroma_floral_green_eucalyptus' },
          ],
        },
      ],
    },
    {
      id: 2,

      label: '과일',
      children: [
        {
          id: 1,

          label: '시트러스',
          children: [
            { id: 1, label: '오렌지', value: 'aroma_fruity_citrus_orange' },
            { id: 2, label: '레몬', value: 'aroma_fruity_citrus_lemon' },
            { id: 3, label: '자몽', value: 'aroma_fruity_citrus_grapefruit' },
            { id: 4, label: '라임', value: 'aroma_fruity_citrus_lime' },
            { id: 5, label: '유자', value: 'aroma_fruity_citrus_yuja' },
          ],
        },
        {
          id: 2,

          label: '베리',
          children: [
            { id: 1, label: '딸기', value: 'aroma_fruity_berry_strawberry' },
            { id: 2, label: '블루베리', value: 'aroma_fruity_berry_blueberry' },
            { id: 3, label: '라즈베리', value: 'aroma_fruity_berry_raspberry' },
            { id: 4, label: '블랙베리', value: 'aroma_fruity_berry_blackberry' },
            { id: 5, label: '크랜베리', value: 'aroma_fruity_berry_cranberry' },
          ],
        },
        {
          id: 3,

          label: '열대과일',
          children: [
            { id: 1, label: '망고', value: 'aroma_fruity_tropical_mango' },
            { id: 2, label: '파인애플', value: 'aroma_fruity_tropical_pineapple' },
            {
              id: 3,

              label: '패션프루트',
              value: 'aroma_fruity_tropical_passionfruit',
            },
            { id: 4, label: '바나나', value: 'aroma_fruity_tropical_banana' },
            { id: 5, label: '코코넛', value: 'aroma_fruity_tropical_coconut' },
          ],
        },
        {
          id: 4,

          label: '건과일',
          children: [
            { id: 1, label: '건자두', value: 'aroma_fruity_dried_prune' },
            { id: 2, label: '건포도', value: 'aroma_fruity_dried_raisin' },
            { id: 3, label: '무화과', value: 'aroma_fruity_dried_fig' },
            { id: 4, label: '대추', value: 'aroma_fruity_dried_date' },
            { id: 5, label: '말린 살구', value: 'aroma_fruity_dried_apricot' },
          ],
        },
        {
          id: 5,

          label: '사과·배',
          children: [
            { id: 1, label: '사과', value: 'aroma_fruity_apple_apple' },
            { id: 2, label: '배', value: 'aroma_fruity_apple_pear' },
            { id: 3, label: '복숭아', value: 'aroma_fruity_apple_peach' },
            { id: 4, label: '자두', value: 'aroma_fruity_apple_plum' },
            { id: 5, label: '살구', value: 'aroma_fruity_apple_apricot' },
          ],
        },
      ],
    },
    {
      id: 3,

      label: '향신료',
      children: [
        {
          id: 1,

          label: '따뜻한 향신료',
          children: [
            { id: 1, label: '시나몬', value: 'aroma_spicy_warm_cinnamon' },
            { id: 2, label: '넛메그', value: 'aroma_spicy_warm_nutmeg' },
            { id: 3, label: '클로브', value: 'aroma_spicy_warm_clove' },
            { id: 4, label: '올스파이스', value: 'aroma_spicy_warm_allspice' },
            { id: 5, label: '카다멈', value: 'aroma_spicy_warm_cardamom' },
          ],
        },
        {
          id: 2,

          label: '매운 향신료',
          children: [
            { id: 1, label: '후추', value: 'aroma_spicy_hot_pepper' },
            { id: 2, label: '칠리', value: 'aroma_spicy_hot_chili' },
            { id: 3, label: '생강', value: 'aroma_spicy_hot_ginger' },
            { id: 4, label: '겨자', value: 'aroma_spicy_hot_mustard' },
            { id: 5, label: '커민', value: 'aroma_spicy_hot_cumin' },
          ],
        },
        {
          id: 3,

          label: '허브',
          children: [
            { id: 1, label: '타임', value: 'aroma_spicy_herb_thyme' },
            { id: 2, label: '오레가노', value: 'aroma_spicy_herb_oregano' },
            { id: 3, label: '딜', value: 'aroma_spicy_herb_dill' },
            { id: 4, label: '페넬', value: 'aroma_spicy_herb_fennel' },
            { id: 5, label: '커리잎', value: 'aroma_spicy_herb_curry_leaf' },
          ],
        },
      ],
    },
    {
      id: 4,

      label: '티·블라썸',
      children: [
        {
          id: 1,

          label: '블랙티',
          children: [
            { id: 1, label: '다질링', value: 'aroma_tea_black_darjeeling' },
            { id: 2, label: '아삼', value: 'aroma_tea_black_assam' },
            { id: 3, label: '실론', value: 'aroma_tea_black_ceylon' },
            { id: 4, label: '얼그레이', value: 'aroma_tea_black_earlgrey' },
            {
              id: 5,

              label: '잉글리시브렉퍼스트',
              value: 'aroma_tea_black_english_breakfast',
            },
          ],
        },
        {
          id: 2,

          label: '그린티',
          children: [
            { id: 1, label: '센차', value: 'aroma_tea_green_sencha' },
            { id: 2, label: '말차', value: 'aroma_tea_green_matcha' },
            { id: 3, label: '자스민그린', value: 'aroma_tea_green_jasmine' },
            { id: 4, label: '현미녹차', value: 'aroma_tea_green_genmaicha' },
            { id: 5, label: '룽징', value: 'aroma_tea_green_longjing' },
          ],
        },
        {
          id: 3,

          label: '우롱',
          children: [
            { id: 1, label: '철관음', value: 'aroma_tea_oolong_tieguanyin' },
            {
              id: 2,

              label: '동방미인',
              value: 'aroma_tea_oolong_oriental_beauty',
            },
            { id: 3, label: '밀크우롱', value: 'aroma_tea_oolong_milk' },
            { id: 4, label: '봉황단총', value: 'aroma_tea_oolong_phoenix' },
            { id: 5, label: '대만고산', value: 'aroma_tea_oolong_high_mountain' },
          ],
        },
        {
          id: 4,

          label: '허브티',
          children: [
            { id: 1, label: '캐모마일', value: 'aroma_tea_herbal_chamomile' },
            { id: 2, label: '히비스커스', value: 'aroma_tea_herbal_hibiscus' },
            { id: 3, label: '루이보스', value: 'aroma_tea_herbal_rooibos' },
            { id: 4, label: '레몬그라스', value: 'aroma_tea_herbal_lemongrass' },
            { id: 5, label: '페퍼민트', value: 'aroma_tea_herbal_peppermint' },
          ],
        },
        {
          id: 5,

          label: '블라썸',
          children: [
            { id: 1, label: '체리블라썸', value: 'aroma_tea_blossom_cherry' },
            { id: 2, label: '오렌지블라썸', value: 'aroma_tea_blossom_orange' },
            { id: 3, label: '복숭아블라썸', value: 'aroma_tea_blossom_peach' },
            { id: 4, label: '자두블라썸', value: 'aroma_tea_blossom_plum' },
            { id: 5, label: '아몬드블라썸', value: 'aroma_tea_blossom_almond' },
          ],
        },
      ],
    },
    {
      id: 5,

      label: '오키드·바이올렛',
      children: [
        {
          id: 1,

          label: '오키드',
          children: [
            {
              id: 1,

              label: '화이트오키드',
              value: 'aroma_orchid_violet_orchid_white',
            },
            {
              id: 2,

              label: '바닐라오키드',
              value: 'aroma_orchid_violet_orchid_vanilla',
            },
            {
              id: 3,

              label: '핑크오키드',
              value: 'aroma_orchid_violet_orchid_pink',
            },
            {
              id: 4,

              label: '덴드로비움',
              value: 'aroma_orchid_violet_orchid_dendrobium',
            },
            {
              id: 5,

              label: '카틀레야',
              value: 'aroma_orchid_violet_orchid_cattleya',
            },
          ],
        },
        {
          id: 2,

          label: '바이올렛',
          children: [
            {
              id: 1,

              label: '스위트바이올렛',
              value: 'aroma_orchid_violet_violet_sweet',
            },
            {
              id: 2,

              label: '아이오니아',
              value: 'aroma_orchid_violet_violet_ionone',
            },
            {
              id: 3,

              label: '바이올렛리프',
              value: 'aroma_orchid_violet_violet_leaf',
            },
            {
              id: 4,

              label: '바이올렛캔디',
              value: 'aroma_orchid_violet_violet_candy',
            },
            {
              id: 5,

              label: '바이올렛파우더',
              value: 'aroma_orchid_violet_violet_powder',
            },
          ],
        },
        {
          id: 3,

          label: '피오니',
          children: [
            {
              id: 1,

              label: '코랄피오니',
              value: 'aroma_orchid_violet_peony_coral',
            },
            {
              id: 2,

              label: '핑크피오니',
              value: 'aroma_orchid_violet_peony_pink',
            },
            {
              id: 3,

              label: '화이트피오니',
              value: 'aroma_orchid_violet_peony_white',
            },
            {
              id: 4,

              label: '트리피오니',
              value: 'aroma_orchid_violet_peony_tree',
            },
            {
              id: 5,

              label: '프레시피오니',
              value: 'aroma_orchid_violet_peony_fresh',
            },
          ],
        },
        {
          id: 4,

          label: '매화',
          children: [
            { id: 1, label: '백매', value: 'aroma_orchid_violet_plum_white' },
            { id: 2, label: '홍매', value: 'aroma_orchid_violet_plum_red' },
            { id: 3, label: '청매', value: 'aroma_orchid_violet_plum_green' },
            { id: 4, label: '매화향', value: 'aroma_orchid_violet_plum_scent' },
            {
              id: 5,

              label: '만개매화',
              value: 'aroma_orchid_violet_plum_full_bloom',
            },
          ],
        },
        {
          id: 5,

          label: '수선화',
          children: [
            {
              id: 1,

              label: '나르시수스',
              value: 'aroma_orchid_violet_narcissus_narcissus',
            },
            {
              id: 2,

              label: '화이트수선화',
              value: 'aroma_orchid_violet_narcissus_white',
            },
            {
              id: 3,

              label: '옐로우수선화',
              value: 'aroma_orchid_violet_narcissus_yellow',
            },
            {
              id: 4,

              label: '더블수선화',
              value: 'aroma_orchid_violet_narcissus_double',
            },
            {
              id: 5,

              label: '페이퍼화이트',
              value: 'aroma_orchid_violet_narcissus_paperwhite',
            },
          ],
        },
      ],
    },
  ],
  taste: [
    {
      id: 1,

      label: '쓴맛',
      children: [
        {
          id: 1,

          label: '코코아·커피',
          children: [
            {
              id: 1,

              label: '코코아닙',
              value: 'taste_bitterness_cocoa_coffee_cocoa_nib',
            },
            {
              id: 2,

              label: '다크초콜릿',
              value: 'taste_bitterness_cocoa_coffee_dark_chocolate',
            },
            {
              id: 3,

              label: '에스프레소',
              value: 'taste_bitterness_cocoa_coffee_espresso',
            },
            {
              id: 4,

              label: '카카오허스크',
              value: 'taste_bitterness_cocoa_coffee_cacao_husk',
            },
            {
              id: 5,

              label: '베이킹초콜릿',
              value: 'taste_bitterness_cocoa_coffee_baking_chocolate',
            },
          ],
        },
        {
          id: 2,

          label: '허벌·식물성',
          children: [
            {
              id: 1,

              label: '겐티안',
              value: 'taste_bitterness_herbal_bitter_gentian',
            },
            {
              id: 2,

              label: '웜우드',
              value: 'taste_bitterness_herbal_bitter_wormwood',
            },
            {
              id: 3,

              label: '민들레뿌리',
              value: 'taste_bitterness_herbal_bitter_dandelion_root',
            },
            {
              id: 4,

              label: '치커리',
              value: 'taste_bitterness_herbal_bitter_chicory',
            },
            {
              id: 5,

              label: '말차',
              value: 'taste_bitterness_herbal_bitter_matcha',
            },
          ],
        },
        {
          id: 3,

          label: '로스티드',
          children: [
            {
              id: 1,

              label: '차콜',
              value: 'taste_bitterness_roasted_bitter_char',
            },
            {
              id: 2,

              label: '탄 토스트',
              value: 'taste_bitterness_roasted_bitter_burnt_toast',
            },
            {
              id: 3,

              label: '스모크',
              value: 'taste_bitterness_roasted_bitter_smoke',
            },
            { id: 4, label: '애쉬', value: 'taste_bitterness_roasted_bitter_ash' },
            {
              id: 5,

              label: '오버로스티드넛',
              value: 'taste_bitterness_roasted_bitter_over_roasted_nut',
            },
          ],
        },
        {
          id: 4,

          label: '타닌',
          children: [
            {
              id: 1,

              label: '블랙티',
              value: 'taste_bitterness_tannin_black_tea_tannin',
            },
            {
              id: 2,

              label: '레드와인타닌',
              value: 'taste_bitterness_tannin_red_wine_tannin',
            },
            {
              id: 3,

              label: '호두껍질',
              value: 'taste_bitterness_tannin_walnut_skin',
            },
            {
              id: 4,

              label: '포도씨',
              value: 'taste_bitterness_tannin_grape_seed',
            },
            { id: 5, label: '오크', value: 'taste_bitterness_tannin_oak' },
          ],
        },
        {
          id: 5,

          label: '퀴닌·홉',
          children: [
            {
              id: 1,

              label: '토닉워터',
              value: 'taste_bitterness_quinine_hops_tonic',
            },
            {
              id: 2,

              label: '자몽피스',
              value: 'taste_bitterness_quinine_hops_grapefruit_pith',
            },
            { id: 3, label: '홉', value: 'taste_bitterness_quinine_hops_hops' },
            {
              id: 4,

              label: '퀴닌',
              value: 'taste_bitterness_quinine_hops_quinine',
            },
            {
              id: 5,

              label: '콜라넛',
              value: 'taste_bitterness_quinine_hops_kola_nut',
            },
          ],
        },
      ],
    },
    {
      id: 2,

      label: '짠맛',
      children: [
        {
          id: 1,

          label: '미네랄',
          children: [
            {
              id: 1,

              label: '미네랄워터',
              value: 'taste_saltiness_mineral_mineral_water',
            },
            { id: 2, label: '락솔트', value: 'taste_saltiness_mineral_rock_salt' },
            { id: 3, label: '슬레이트', value: 'taste_saltiness_mineral_slate' },
            { id: 4, label: '초크', value: 'taste_saltiness_mineral_chalk' },
            { id: 5, label: '세일린', value: 'taste_saltiness_mineral_saline' },
          ],
        },
        {
          id: 2,

          label: '해양',
          children: [
            { id: 1, label: '씨솔트', value: 'taste_saltiness_sea_sea_salt' },
            { id: 2, label: '바다바람', value: 'taste_saltiness_sea_sea_breeze' },
            { id: 3, label: '노리솔트', value: 'taste_saltiness_sea_nori_salt' },
            {
              id: 4,

              label: '앤초비솔트',
              value: 'taste_saltiness_sea_anchovy_salt',
            },
            { id: 5, label: '브라인', value: 'taste_saltiness_sea_brine' },
          ],
        },
        {
          id: 3,

          label: '브로스',
          children: [
            {
              id: 1,

              label: '라이트브로스',
              value: 'taste_saltiness_broth_light_broth',
            },
            {
              id: 2,

              label: '치킨브로스',
              value: 'taste_saltiness_broth_chicken_broth',
            },
            {
              id: 3,

              label: '베지터블스톡',
              value: 'taste_saltiness_broth_vegetable_stock',
            },
            { id: 4, label: '미소수프', value: 'taste_saltiness_broth_miso_soup' },
            { id: 5, label: '다시', value: 'taste_saltiness_broth_dashi' },
          ],
        },
        {
          id: 4,

          label: '발효계 짠맛',
          children: [
            {
              id: 1,

              label: '간장',
              value: 'taste_saltiness_fermented_salty_soy_sauce',
            },
            {
              id: 2,

              label: '피시소스',
              value: 'taste_saltiness_fermented_salty_fish_sauce',
            },
            {
              id: 3,

              label: '피클브라인',
              value: 'taste_saltiness_fermented_salty_pickled_brine',
            },
            {
              id: 4,

              label: '김치브라인',
              value: 'taste_saltiness_fermented_salty_kimchi_brine',
            },
            {
              id: 5,

              label: '올리브브라인',
              value: 'taste_saltiness_fermented_salty_olive_brine',
            },
          ],
        },
        {
          id: 5,

          label: '치즈계',
          children: [
            {
              id: 1,

              label: '파르미지아노',
              value: 'taste_saltiness_cheesy_salty_parmesan',
            },
            {
              id: 2,

              label: '페코리노',
              value: 'taste_saltiness_cheesy_salty_pecorino',
            },
            { id: 3, label: '페타', value: 'taste_saltiness_cheesy_salty_feta' },
            {
              id: 4,

              label: '에이지드체다',
              value: 'taste_saltiness_cheesy_salty_aged_cheddar',
            },
            {
              id: 5,

              label: '블루치즈',
              value: 'taste_saltiness_cheesy_salty_blue_cheese',
            },
          ],
        },
      ],
    },
    {
      id: 3,

      label: '감칠맛',
      children: [
        {
          id: 1,

          label: '버섯',
          children: [
            { id: 1, label: '표고', value: 'taste_umami_mushroom_shiitake' },
            { id: 2, label: '포르치니', value: 'taste_umami_mushroom_porcini' },
            { id: 3, label: '양송이', value: 'taste_umami_mushroom_champignon' },
            { id: 4, label: '트러플', value: 'taste_umami_mushroom_truffle' },
            { id: 5, label: '모렐', value: 'taste_umami_mushroom_morel' },
          ],
        },
        {
          id: 2,

          label: '육향',
          children: [
            { id: 1, label: '비프브로스', value: 'taste_umami_meaty_beef_broth' },
            { id: 2, label: '햄', value: 'taste_umami_meaty_ham' },
            { id: 3, label: '프로슈토', value: 'taste_umami_meaty_prosciutto' },
            {
              id: 4,

              label: '로스트치킨',
              value: 'taste_umami_meaty_roast_chicken',
            },
            { id: 5, label: '그레이비', value: 'taste_umami_meaty_gravy' },
          ],
        },
        {
          id: 3,

          label: '발효',
          children: [
            { id: 1, label: '미소', value: 'taste_umami_fermented_miso' },
            { id: 2, label: '간장', value: 'taste_umami_fermented_soy_sauce' },
            { id: 3, label: '된장', value: 'taste_umami_fermented_doenjang' },
            { id: 4, label: '고추장', value: 'taste_umami_fermented_gochujang' },
            {
              id: 5,

              label: '가쓰오부시',
              value: 'taste_umami_fermented_katsuobushi',
            },
          ],
        },
        {
          id: 4,

          label: '해조',
          children: [
            { id: 1, label: '곤부', value: 'taste_umami_seaweed_kombu' },
            { id: 2, label: '노리', value: 'taste_umami_seaweed_nori' },
            { id: 3, label: '와카메', value: 'taste_umami_seaweed_wakame' },
            { id: 4, label: '켈프', value: 'taste_umami_seaweed_kelp' },
            { id: 5, label: '히지키', value: 'taste_umami_seaweed_hijiki' },
          ],
        },
        {
          id: 5,

          label: '에이징',
          children: [
            {
              id: 1,

              label: '파르미지아노껍질',
              value: 'taste_umami_aged_parmesan_rind',
            },
            {
              id: 2,

              label: '에이지드치즈',
              value: 'taste_umami_aged_aged_cheese',
            },
            { id: 3, label: '가쓰오부시', value: 'taste_umami_aged_bonito_flake' },
            { id: 4, label: '마마이트', value: 'taste_umami_aged_marmite' },
            { id: 5, label: 'XO소스', value: 'taste_umami_aged_xo_sauce' },
          ],
        },
      ],
    },
    {
      id: 4,

      label: '구수함',
      children: [
        {
          id: 1,

          label: '곡물',
          children: [
            { id: 1, label: '보리', value: 'taste_toasty_grain_barley' },
            { id: 2, label: '현미', value: 'taste_toasty_grain_brown_rice' },
            { id: 3, label: '옥수수', value: 'taste_toasty_grain_corn' },
            { id: 4, label: '메밀', value: 'taste_toasty_grain_buckwheat' },
            { id: 5, label: '귀리', value: 'taste_toasty_grain_oat' },
          ],
        },
        {
          id: 2,

          label: '고소견과',
          children: [
            { id: 1, label: '땅콩', value: 'taste_toasty_nutty_peanut' },
            { id: 2, label: '아몬드', value: 'taste_toasty_nutty_almond' },
            { id: 3, label: '캐슈', value: 'taste_toasty_nutty_cashew' },
            {
              id: 4,

              label: '해바라기씨',
              value: 'taste_toasty_nutty_sunflower_seed',
            },
            { id: 5, label: '참깨', value: 'taste_toasty_nutty_sesame' },
          ],
        },
        {
          id: 3,

          label: '맥아·토스트',
          children: [
            {
              id: 1,

              label: '라이트토스트',
              value: 'taste_toasty_malt_toast_light_toast',
            },
            {
              id: 2,

              label: '미디엄토스트',
              value: 'taste_toasty_malt_toast_medium_toast',
            },
            {
              id: 3,

              label: '다크토스트',
              value: 'taste_toasty_malt_toast_dark_toast',
            },
            { id: 4, label: '맥아', value: 'taste_toasty_malt_toast_malt' },
            { id: 5, label: '그래놀라', value: 'taste_toasty_malt_toast_granola' },
          ],
        },
        {
          id: 4,

          label: '곡물음료',
          children: [
            {
              id: 1,

              label: '보리차',
              value: 'taste_toasty_grain_drink_barley_tea',
            },
            {
              id: 2,

              label: '옥수수수염차',
              value: 'taste_toasty_grain_drink_corn_silk_tea',
            },
            {
              id: 3,

              label: '현미차',
              value: 'taste_toasty_grain_drink_brown_rice_tea',
            },
            {
              id: 4,

              label: '미숫가루',
              value: 'taste_toasty_grain_drink_misugaru',
            },
            { id: 5, label: '식혜', value: 'taste_toasty_grain_drink_sikhye' },
          ],
        },
        {
          id: 5,

          label: '곡분·반죽',
          children: [
            { id: 1, label: '반죽향', value: 'taste_toasty_doughy_cereal_dough' },
            {
              id: 2,

              label: '비스킷',
              value: 'taste_toasty_doughy_cereal_biscuit',
            },
            {
              id: 3,

              label: '크래커',
              value: 'taste_toasty_doughy_cereal_cracker',
            },
            {
              id: 4,

              label: '도우',
              value: 'taste_toasty_doughy_cereal_bread_dough',
            },
            {
              id: 5,

              label: '누룽지',
              value: 'taste_toasty_doughy_cereal_scorched_rice',
            },
          ],
        },
      ],
    },
    {
      id: 5,

      label: '스모키',
      children: [
        {
          id: 1,

          label: '우디 스모크',
          children: [
            { id: 1, label: '장작', value: 'taste_smoky_woody_smoke_firewood' },
            { id: 2, label: '히코리', value: 'taste_smoky_woody_smoke_hickory' },
            { id: 3, label: '오크', value: 'taste_smoky_woody_smoke_oak_wood' },
            { id: 4, label: '삼나무', value: 'taste_smoky_woody_smoke_cedar' },
            { id: 5, label: '숯', value: 'taste_smoky_woody_smoke_charcoal' },
          ],
        },
        {
          id: 2,

          label: '타르·레진',
          children: [
            { id: 1, label: '타르', value: 'taste_smoky_tar_resin_tar' },
            { id: 2, label: '역청', value: 'taste_smoky_tar_resin_bitumen' },
            { id: 3, label: '송진', value: 'taste_smoky_tar_resin_pine_resin' },
            { id: 4, label: '수지', value: 'taste_smoky_tar_resin_resin' },
            { id: 5, label: '석탄가루', value: 'taste_smoky_tar_resin_coal_dust' },
          ],
        },
        {
          id: 3,

          label: '훈연식품',
          children: [
            {
              id: 1,

              label: '훈제베이컨',
              value: 'taste_smoky_smoked_food_smoked_bacon',
            },
            {
              id: 2,

              label: '훈제치즈',
              value: 'taste_smoky_smoked_food_smoked_cheese',
            },
            {
              id: 3,

              label: '훈제넛',
              value: 'taste_smoky_smoked_food_smoked_nut',
            },
            {
              id: 4,

              label: '훈제소금',
              value: 'taste_smoky_smoked_food_smoked_salt',
            },
            {
              id: 5,

              label: '라프산소총',
              value: 'taste_smoky_smoked_food_lapsang_souchong',
            },
          ],
        },
        {
          id: 4,

          label: '재·그을음',
          children: [
            { id: 1, label: '잿내', value: 'taste_smoky_ash_soot_ashy' },
            { id: 2, label: '그을음', value: 'taste_smoky_ash_soot_soot' },
            { id: 3, label: '재비', value: 'taste_smoky_ash_soot_cinder' },
            { id: 4, label: '탄내', value: 'taste_smoky_ash_soot_burnt' },
            { id: 5, label: '소각향', value: 'taste_smoky_ash_soot_incinerated' },
          ],
        },
        {
          id: 5,

          label: '담배·가죽',
          children: [
            { id: 1, label: '시가', value: 'taste_smoky_tobacco_leather_cigar' },
            {
              id: 2,

              label: '담배잎',
              value: 'taste_smoky_tobacco_leather_tobacco_leaf',
            },
            {
              id: 3,

              label: '파이프스모크',
              value: 'taste_smoky_tobacco_leather_pipe_smoke',
            },
            { id: 4, label: '가죽', value: 'taste_smoky_tobacco_leather_leather' },
            {
              id: 5,

              label: '새들가죽',
              value: 'taste_smoky_tobacco_leather_saddle_leather',
            },
          ],
        },
      ],
    },
  ],
  acidity: [
    {
      id: 1,

      label: '시트러스',
      children: [
        {
          id: 1,

          label: '레몬',
          children: [
            { id: 1, label: '레몬', value: 'acidity_citrus_lemon_lemon' },
            { id: 2, label: '라임', value: 'acidity_citrus_lemon_lime' },
            { id: 3, label: '유자', value: 'acidity_citrus_lemon_yuzu' },
            { id: 4, label: '청귤', value: 'acidity_citrus_lemon_green_mandarin' },
            { id: 5, label: '베르가못', value: 'acidity_citrus_lemon_bergamot' },
          ],
        },
        {
          id: 2,

          label: '오렌지',
          children: [
            { id: 1, label: '오렌지', value: 'acidity_citrus_orange_orange' },
            { id: 2, label: '자몽', value: 'acidity_citrus_orange_grapefruit' },
            { id: 3, label: '탠저린', value: 'acidity_citrus_orange_tangerine' },
            { id: 4, label: '만다린', value: 'acidity_citrus_orange_mandarin' },
            {
              id: 5,

              label: '블러드오렌지',
              value: 'acidity_citrus_orange_blood_orange',
            },
          ],
        },
        {
          id: 3,

          label: '열대과일',
          children: [
            {
              id: 1,

              label: '파인애플',
              value: 'acidity_citrus_tropical_pineapple',
            },
            {
              id: 2,

              label: '패션프루트',
              value: 'acidity_citrus_tropical_passionfruit',
            },
            { id: 3, label: '망고', value: 'acidity_citrus_tropical_mango' },
            { id: 4, label: '파파야', value: 'acidity_citrus_tropical_papaya' },
            { id: 5, label: '리치', value: 'acidity_citrus_tropical_lychee' },
          ],
        },
        {
          id: 4,

          label: '신선한 과일',
          children: [
            { id: 1, label: '사과', value: 'acidity_citrus_fresh_fruit_apple' },
            { id: 2, label: '배', value: 'acidity_citrus_fresh_fruit_pear' },
            { id: 3, label: '포도', value: 'acidity_citrus_fresh_fruit_grape' },
            { id: 4, label: '체리', value: 'acidity_citrus_fresh_fruit_cherry' },
            { id: 5, label: '복숭아', value: 'acidity_citrus_fresh_fruit_peach' },
          ],
        },
        {
          id: 5,

          label: '베리',
          children: [
            { id: 1, label: '크랜베리', value: 'acidity_citrus_berry_cranberry' },
            { id: 2, label: '라즈베리', value: 'acidity_citrus_berry_raspberry' },
            { id: 3, label: '블루베리', value: 'acidity_citrus_berry_blueberry' },
            {
              id: 4,

              label: '블랙커런트',
              value: 'acidity_citrus_berry_blackcurrant',
            },
            { id: 5, label: '구스베리', value: 'acidity_citrus_berry_gooseberry' },
          ],
        },
      ],
    },
    {
      id: 2,

      label: '말릭',
      children: [
        {
          id: 1,

          label: '그린애플',
          children: [
            {
              id: 1,

              label: '풋사과',
              value: 'acidity_malic_green_apple_unripe_apple',
            },
            {
              id: 2,

              label: '사과껍질',
              value: 'acidity_malic_green_apple_apple_peel',
            },
            {
              id: 3,

              label: '사과즙',
              value: 'acidity_malic_green_apple_apple_juice',
            },
            {
              id: 4,

              label: '사과식초',
              value: 'acidity_malic_green_apple_apple_vinegar',
            },
            {
              id: 5,

              label: '사과캔디',
              value: 'acidity_malic_green_apple_apple_candy',
            },
          ],
        },
        {
          id: 2,

          label: '배',
          children: [
            { id: 1, label: '배', value: 'acidity_malic_pear_pear' },
            { id: 2, label: '모과', value: 'acidity_malic_pear_quince' },
            { id: 3, label: '서양배', value: 'acidity_malic_pear_western_pear' },
            { id: 4, label: '유럽배', value: 'acidity_malic_pear_european_pear' },
            { id: 5, label: '아시아배', value: 'acidity_malic_pear_asian_pear' },
          ],
        },
        {
          id: 3,

          label: '포도',
          children: [
            {
              id: 1,

              label: '화이트그레이프',
              value: 'acidity_malic_grape_white_grape',
            },
            { id: 2, label: '적포도', value: 'acidity_malic_grape_red_grape' },
            { id: 3, label: '청포도', value: 'acidity_malic_grape_green_grape' },
            { id: 4, label: '건포도', value: 'acidity_malic_grape_raisin' },
            { id: 5, label: '포도즙', value: 'acidity_malic_grape_grape_juice' },
          ],
        },
        {
          id: 4,

          label: '플럼·체리',
          children: [
            { id: 1, label: '자두', value: 'acidity_malic_plum_cherry_plum' },
            { id: 2, label: '체리', value: 'acidity_malic_plum_cherry_cherry' },
            {
              id: 3,

              label: '사워체리',
              value: 'acidity_malic_plum_cherry_sour_cherry',
            },
            {
              id: 4,

              label: '블랙체리',
              value: 'acidity_malic_plum_cherry_black_cherry',
            },
            {
              id: 5,

              label: '자두껍질',
              value: 'acidity_malic_plum_cherry_plum_skin',
            },
          ],
        },
        {
          id: 5,

          label: '베리',
          children: [
            { id: 1, label: '딸기', value: 'acidity_malic_berry_strawberry' },
            { id: 2, label: '라즈베리', value: 'acidity_malic_berry_raspberry' },
            { id: 3, label: '크랜베리', value: 'acidity_malic_berry_cranberry' },
            { id: 4, label: '블랙베리', value: 'acidity_malic_berry_blackberry' },
            { id: 5, label: '커런트', value: 'acidity_malic_berry_currant' },
          ],
        },
      ],
    },
    {
      id: 3,

      label: '타르타릭',
      children: [
        {
          id: 1,

          label: '와인',
          children: [
            {
              id: 1,

              label: '화이트와인',
              value: 'acidity_tartaric_wine_white_wine',
            },
            { id: 2, label: '레드와인', value: 'acidity_tartaric_wine_red_wine' },
            { id: 3, label: '로제와인', value: 'acidity_tartaric_wine_rose_wine' },
            {
              id: 4,

              label: '스파클링와인',
              value: 'acidity_tartaric_wine_sparkling_wine',
            },
            { id: 5, label: '포트와인', value: 'acidity_tartaric_wine_port_wine' },
          ],
        },
        {
          id: 2,

          label: '건과일',
          children: [
            {
              id: 1,

              label: '건자두',
              value: 'acidity_tartaric_dried_fruit_prune',
            },
            {
              id: 2,

              label: '건포도',
              value: 'acidity_tartaric_dried_fruit_raisin',
            },
            {
              id: 3,

              label: '말린살구',
              value: 'acidity_tartaric_dried_fruit_dried_apricot',
            },
            {
              id: 4,

              label: '말린무화과',
              value: 'acidity_tartaric_dried_fruit_dried_fig',
            },
            {
              id: 5,

              label: '건체리',
              value: 'acidity_tartaric_dried_fruit_dried_cherry',
            },
          ],
        },
        {
          id: 3,

          label: '포도',
          children: [
            { id: 1, label: '버주스', value: 'acidity_tartaric_grape_verjus' },
            {
              id: 2,

              label: '포도껍질',
              value: 'acidity_tartaric_grape_grape_peel',
            },
            { id: 3, label: '포도씨', value: 'acidity_tartaric_grape_grape_seed' },
            {
              id: 4,

              label: '청포도즙',
              value: 'acidity_tartaric_grape_grape_juice',
            },
            {
              id: 5,

              label: '와인머스트',
              value: 'acidity_tartaric_grape_wine_must',
            },
          ],
        },
        {
          id: 4,

          label: '시큼한 과즙',
          children: [
            {
              id: 1,

              label: '석류',
              value: 'acidity_tartaric_tangy_juice_pomegranate',
            },
            {
              id: 2,

              label: '타마린드',
              value: 'acidity_tartaric_tangy_juice_tamarind',
            },
            {
              id: 3,

              label: '감귤',
              value: 'acidity_tartaric_tangy_juice_mandarin_orange',
            },
            {
              id: 4,

              label: '포멜로',
              value: 'acidity_tartaric_tangy_juice_pomelo',
            },
            {
              id: 5,

              label: '사워체리즙',
              value: 'acidity_tartaric_tangy_juice_sour_cherry_juice',
            },
          ],
        },
        {
          id: 5,

          label: '산포화감',
          children: [
            { id: 1, label: '상큼한', value: 'acidity_tartaric_crisp_tart_crisp' },
            { id: 2, label: '시큼한', value: 'acidity_tartaric_crisp_tart_tart' },
            { id: 3, label: '깔끔한', value: 'acidity_tartaric_crisp_tart_clean' },
            { id: 4, label: '산뜻한', value: 'acidity_tartaric_crisp_tart_fresh' },
            {
              id: 5,

              label: '날카로운',
              value: 'acidity_tartaric_crisp_tart_sharp',
            },
          ],
        },
      ],
    },
    {
      id: 4,

      label: '아세틱',
      children: [
        {
          id: 1,

          label: '발효산미',
          children: [
            {
              id: 1,

              label: '식초',
              value: 'acidity_acetic_fermented_acid_vinegar',
            },
            {
              id: 2,

              label: '사과식초',
              value: 'acidity_acetic_fermented_acid_apple_vinegar',
            },
            {
              id: 3,

              label: '발사믹식초',
              value: 'acidity_acetic_fermented_acid_balsamic',
            },
            {
              id: 4,

              label: '포도식초',
              value: 'acidity_acetic_fermented_acid_grape_vinegar',
            },
            {
              id: 5,

              label: '와인비네거',
              value: 'acidity_acetic_fermented_acid_wine_vinegar',
            },
          ],
        },
        {
          id: 2,

          label: '발효음료',
          children: [
            {
              id: 1,

              label: '콤부차',
              value: 'acidity_acetic_fermented_drink_kombucha',
            },
            {
              id: 2,

              label: '사워비어',
              value: 'acidity_acetic_fermented_drink_sour_beer',
            },
            {
              id: 3,

              label: '사워사케',
              value: 'acidity_acetic_fermented_drink_sour_sake',
            },
            {
              id: 4,

              label: '요거트드링크',
              value: 'acidity_acetic_fermented_drink_yogurt_drink',
            },
            {
              id: 5,

              label: '라씨',
              value: 'acidity_acetic_fermented_drink_lassi',
            },
          ],
        },
        {
          id: 3,

          label: '피클',
          children: [
            {
              id: 1,

              label: '오이피클',
              value: 'acidity_acetic_pickle_cucumber_pickle',
            },
            {
              id: 2,

              label: '무피클',
              value: 'acidity_acetic_pickle_radish_pickle',
            },
            {
              id: 3,

              label: '양파피클',
              value: 'acidity_acetic_pickle_onion_pickle',
            },
            { id: 4, label: '김치', value: 'acidity_acetic_pickle_kimchi' },
            {
              id: 5,

              label: '사워크라우트',
              value: 'acidity_acetic_pickle_sauerkraut',
            },
          ],
        },
        {
          id: 4,

          label: '사워도우',
          children: [
            {
              id: 1,

              label: '사워도우',
              value: 'acidity_acetic_sourdough_sourdough',
            },
            {
              id: 2,

              label: '천연효모',
              value: 'acidity_acetic_sourdough_natural_yeast',
            },
            {
              id: 3,

              label: '발효빵',
              value: 'acidity_acetic_sourdough_fermented_bread',
            },
            {
              id: 4,

              label: '요거트빵',
              value: 'acidity_acetic_sourdough_yogurt_bread',
            },
            {
              id: 5,

              label: '루벤빵',
              value: 'acidity_acetic_sourdough_reuben_bread',
            },
          ],
        },
        {
          id: 5,

          label: '식초향산미',
          children: [
            {
              id: 1,

              label: '신맛강한',
              value: 'acidity_acetic_vinegar_aroma_sharp_acid',
            },
            {
              id: 2,

              label: '톡쏘는',
              value: 'acidity_acetic_vinegar_aroma_tingling',
            },
            {
              id: 3,

              label: '자극적인',
              value: 'acidity_acetic_vinegar_aroma_pungent',
            },
            {
              id: 4,

              label: '매끈한산',
              value: 'acidity_acetic_vinegar_aroma_smooth_acid',
            },
            {
              id: 5,

              label: '가벼운산',
              value: 'acidity_acetic_vinegar_aroma_light_acid',
            },
          ],
        },
      ],
    },
    {
      id: 5,

      label: '락틱',
      children: [
        {
          id: 1,

          label: '유산발효',
          children: [
            {
              id: 1,

              label: '요거트',
              value: 'acidity_lactic_lactic_fermentation_yogurt',
            },
            {
              id: 2,

              label: '사워크림',
              value: 'acidity_lactic_lactic_fermentation_sour_cream',
            },
            {
              id: 3,

              label: '버터밀크',
              value: 'acidity_lactic_lactic_fermentation_buttermilk',
            },
            {
              id: 4,

              label: '리코타',
              value: 'acidity_lactic_lactic_fermentation_ricotta',
            },
            {
              id: 5,

              label: '케피어',
              value: 'acidity_lactic_lactic_fermentation_kefir',
            },
          ],
        },
        {
          id: 2,

          label: '치즈',
          children: [
            {
              id: 1,

              label: '프레시치즈',
              value: 'acidity_lactic_cheesy_lactic_fresh_cheese',
            },
            {
              id: 2,

              label: '크림치즈',
              value: 'acidity_lactic_cheesy_lactic_cream_cheese',
            },
            {
              id: 3,

              label: '요거트치즈',
              value: 'acidity_lactic_cheesy_lactic_yogurt_cheese',
            },
            {
              id: 4,

              label: '마스카포네',
              value: 'acidity_lactic_cheesy_lactic_mascarpone',
            },
            {
              id: 5,

              label: '퀘소블랑코',
              value: 'acidity_lactic_cheesy_lactic_queso_blanco',
            },
          ],
        },
        {
          id: 3,

          label: '버터·유제품',
          children: [
            { id: 1, label: '버터', value: 'acidity_lactic_buttery_dairy_butter' },
            {
              id: 2,

              label: '생크림',
              value: 'acidity_lactic_buttery_dairy_fresh_cream',
            },
            { id: 3, label: '우유', value: 'acidity_lactic_buttery_dairy_milk' },
            {
              id: 4,

              label: '연유',
              value: 'acidity_lactic_buttery_dairy_condensed_milk',
            },
            {
              id: 5,

              label: '요구르트',
              value: 'acidity_lactic_buttery_dairy_yogurt_drink',
            },
          ],
        },
        {
          id: 4,

          label: '부드러운 산미',
          children: [
            { id: 1, label: '크리미한', value: 'acidity_lactic_soft_acid_creamy' },
            { id: 2, label: '매끄러운', value: 'acidity_lactic_soft_acid_smooth' },
            { id: 3, label: '온화한', value: 'acidity_lactic_soft_acid_mild' },
            { id: 4, label: '부드러운', value: 'acidity_lactic_soft_acid_gentle' },
            { id: 5, label: '은은한', value: 'acidity_lactic_soft_acid_subtle' },
          ],
        },
        {
          id: 5,

          label: '요거트',
          children: [
            {
              id: 1,

              label: '플레인요거트',
              value: 'acidity_lactic_yogurty_plain_yogurt',
            },
            {
              id: 2,

              label: '그릭요거트',
              value: 'acidity_lactic_yogurty_greek_yogurt',
            },
            {
              id: 3,

              label: '딸기요거트',
              value: 'acidity_lactic_yogurty_strawberry_yogurt',
            },
            {
              id: 4,

              label: '복숭아요거트',
              value: 'acidity_lactic_yogurty_peach_yogurt',
            },
            {
              id: 5,

              label: '꿀요거트',
              value: 'acidity_lactic_yogurty_honey_yogurt',
            },
          ],
        },
      ],
    },
  ],
  sweetness: [
    {
      id: 1,

      label: '설탕',
      children: [
        {
          id: 1,

          label: '정제당',
          children: [
            {
              id: 1,

              label: '백설탕',
              value: 'sweetness_sugar_refined_sugar_white_sugar',
            },
            {
              id: 2,

              label: '분당',
              value: 'sweetness_sugar_refined_sugar_powdered_sugar',
            },
            {
              id: 3,

              label: '건당',
              value: 'sweetness_sugar_refined_sugar_rock_candy',
            },
            {
              id: 4,

              label: '큐브슈가',
              value: 'sweetness_sugar_refined_sugar_sugar_cube',
            },
            {
              id: 5,

              label: '설탕시럽',
              value: 'sweetness_sugar_refined_sugar_sugar_syrup',
            },
          ],
        },
        {
          id: 2,

          label: '비정제당',
          children: [
            {
              id: 1,

              label: '황설탕',
              value: 'sweetness_sugar_unrefined_sugar_light_brown_sugar',
            },
            {
              id: 2,

              label: '흑설탕',
              value: 'sweetness_sugar_unrefined_sugar_dark_brown_sugar',
            },
            {
              id: 3,

              label: '머스코바도',
              value: 'sweetness_sugar_unrefined_sugar_muscovado',
            },
            {
              id: 4,

              label: '터비나도',
              value: 'sweetness_sugar_unrefined_sugar_turbinado',
            },
            {
              id: 5,

              label: '데메라라',
              value: 'sweetness_sugar_unrefined_sugar_demerara',
            },
          ],
        },
        {
          id: 3,

          label: '시럽',
          children: [
            {
              id: 1,

              label: '심플시럽',
              value: 'sweetness_sugar_syrups_simple_syrup',
            },
            {
              id: 2,

              label: '골든시럽',
              value: 'sweetness_sugar_syrups_golden_syrup',
            },
            {
              id: 3,

              label: '옥수수시럽',
              value: 'sweetness_sugar_syrups_corn_syrup',
            },
            {
              id: 4,

              label: '글루코스시럽',
              value: 'sweetness_sugar_syrups_glucose_syrup',
            },
            {
              id: 5,

              label: '아가베시럽',
              value: 'sweetness_sugar_syrups_agave_syrup',
            },
          ],
        },
        {
          id: 4,

          label: '당밀',
          children: [
            {
              id: 1,

              label: '라이트몰라시스',
              value: 'sweetness_sugar_molasses_light_molasses',
            },
            {
              id: 2,

              label: '다크몰라시스',
              value: 'sweetness_sugar_molasses_dark_molasses',
            },
            {
              id: 3,

              label: '블랙스트랩',
              value: 'sweetness_sugar_molasses_blackstrap_molasses',
            },
            {
              id: 4,

              label: '사탕수수당밀',
              value: 'sweetness_sugar_molasses_cane_molasses',
            },
            {
              id: 5,

              label: '비트당밀',
              value: 'sweetness_sugar_molasses_beet_molasses',
            },
          ],
        },
        {
          id: 5,

          label: '캔디',
          children: [
            {
              id: 1,

              label: '하드캔디',
              value: 'sweetness_sugar_candies_hard_candy',
            },
            {
              id: 2,

              label: '롤리팝',
              value: 'sweetness_sugar_candies_lollipop',
            },
            {
              id: 3,

              label: '젤리빈',
              value: 'sweetness_sugar_candies_jelly_bean',
            },
            {
              id: 4,

              label: '프룻드롭',
              value: 'sweetness_sugar_candies_fruit_drop',
            },
            {
              id: 5,

              label: '퍼지',
              value: 'sweetness_sugar_candies_fudge',
            },
          ],
        },
      ],
    },
    {
      id: 2,

      label: '카라멜라이즈',
      children: [
        {
          id: 1,

          label: '카라멜',
          children: [
            {
              id: 1,

              label: '카라멜',
              value: 'sweetness_caramelized_caramel_caramel_core',
            },
            {
              id: 2,

              label: '솔티드카라멜',
              value: 'sweetness_caramelized_caramel_salted_caramel',
            },
            {
              id: 3,

              label: '카라멜소스',
              value: 'sweetness_caramelized_caramel_caramel_sauce',
            },
            {
              id: 4,

              label: '카라멜크림',
              value: 'sweetness_caramelized_caramel_caramel_cream',
            },
            {
              id: 5,

              label: '번트슈거',
              value: 'sweetness_caramelized_caramel_burnt_sugar',
            },
          ],
        },
        {
          id: 2,

          label: '토피',
          children: [
            {
              id: 1,

              label: '토피',
              value: 'sweetness_caramelized_toffee_toffee_core',
            },
            {
              id: 2,

              label: '토피넛',
              value: 'sweetness_caramelized_toffee_toffee_nut',
            },
            {
              id: 3,

              label: '토피크런치',
              value: 'sweetness_caramelized_toffee_toffee_crunch',
            },
            {
              id: 4,

              label: '토피소스',
              value: 'sweetness_caramelized_toffee_toffee_sauce',
            },
            {
              id: 5,

              label: '버터토피',
              value: 'sweetness_caramelized_toffee_butter_toffee',
            },
          ],
        },
        {
          id: 3,

          label: '버터스카치',
          children: [
            {
              id: 1,

              label: '버터스카치',
              value: 'sweetness_caramelized_butterscotch_butterscotch_core',
            },
            {
              id: 2,

              label: '버터스카치소스',
              value: 'sweetness_caramelized_butterscotch_butterscotch_sauce',
            },
            {
              id: 3,

              label: '버터스카치캔디',
              value: 'sweetness_caramelized_butterscotch_butterscotch_candy',
            },
            {
              id: 4,

              label: '스카치토피',
              value: 'sweetness_caramelized_butterscotch_scotch_toffee',
            },
            {
              id: 5,

              label: '브라운버터',
              value: 'sweetness_caramelized_butterscotch_brown_butter',
            },
          ],
        },
        {
          id: 4,

          label: '브륄레',
          children: [
            {
              id: 1,

              label: '크렘브륄레',
              value: 'sweetness_caramelized_brulee_creme_brulee',
            },
            {
              id: 2,

              label: '설탕크러스트',
              value: 'sweetness_caramelized_brulee_sugar_crust',
            },
            {
              id: 3,

              label: '카라멜화설탕',
              value: 'sweetness_caramelized_brulee_caramelized_sugar',
            },
            {
              id: 4,

              label: '카라멜푸딩',
              value: 'sweetness_caramelized_brulee_caramel_pudding',
            },
            {
              id: 5,

              label: '카라멜크림브륄레',
              value: 'sweetness_caramelized_brulee_caramel_cream_brulee',
            },
          ],
        },
        {
          id: 5,

          label: '구운당미',
          children: [
            {
              id: 1,

              label: '로스티드마시멜로',
              value: 'sweetness_caramelized_toasted_sweet_roasted_marshmallow',
            },
            {
              id: 2,

              label: '카라멜팝콘',
              value: 'sweetness_caramelized_toasted_sweet_caramel_popcorn',
            },
            {
              id: 3,

              label: '토스트슈거',
              value: 'sweetness_caramelized_toasted_sweet_toasted_sugar',
            },
            {
              id: 4,

              label: '브라운슈가노트',
              value: 'sweetness_caramelized_toasted_sweet_brown_sugar_note',
            },
            {
              id: 5,

              label: '몰트스위트',
              value: 'sweetness_caramelized_toasted_sweet_malt_sweet',
            },
          ],
        },
      ],
    },
    {
      id: 3,

      label: '허니',
      children: [
        {
          id: 1,

          label: '라이트허니',
          children: [
            {
              id: 1,

              label: '아카시아꿀',
              value: 'sweetness_honeyed_light_honey_acacia_honey',
            },
            {
              id: 2,

              label: '클로버꿀',
              value: 'sweetness_honeyed_light_honey_clover_honey',
            },
            {
              id: 3,

              label: '오렌지블로섬꿀',
              value: 'sweetness_honeyed_light_honey_orange_blossom_honey',
            },
            {
              id: 4,

              label: '라임블로섬꿀',
              value: 'sweetness_honeyed_light_honey_lime_blossom_honey',
            },
            {
              id: 5,

              label: '라이트와일드플라워',
              value: 'sweetness_honeyed_light_honey_light_wildflower_honey',
            },
          ],
        },
        {
          id: 2,

          label: '다크허니',
          children: [
            {
              id: 1,

              label: '밤꿀',
              value: 'sweetness_honeyed_dark_honey_chestnut_honey',
            },
            {
              id: 2,

              label: '메밀꿀',
              value: 'sweetness_honeyed_dark_honey_buckwheat_honey',
            },
            {
              id: 3,

              label: '유칼립투스꿀',
              value: 'sweetness_honeyed_dark_honey_eucalyptus_honey',
            },
            {
              id: 4,

              label: '마누카꿀',
              value: 'sweetness_honeyed_dark_honey_manuka_honey',
            },
            {
              id: 5,

              label: '소나무꿀',
              value: 'sweetness_honeyed_dark_honey_pine_honey',
            },
          ],
        },
        {
          id: 3,

          label: '허니디저트',
          children: [
            {
              id: 1,

              label: '허니버터',
              value: 'sweetness_honeyed_honey_dessert_honey_butter',
            },
            {
              id: 2,

              label: '허니쿠키',
              value: 'sweetness_honeyed_honey_dessert_honey_cookie',
            },
            {
              id: 3,

              label: '허니케이크',
              value: 'sweetness_honeyed_honey_dessert_honey_cake',
            },
            {
              id: 4,

              label: '허니글레이즈',
              value: 'sweetness_honeyed_honey_dessert_honey_glaze',
            },
            {
              id: 5,

              label: '허니그래놀라',
              value: 'sweetness_honeyed_honey_dessert_honey_granola',
            },
          ],
        },
        {
          id: 4,

          label: '허니음료',
          children: [
            {
              id: 1,

              label: '허니레몬티',
              value: 'sweetness_honeyed_honey_drink_honey_lemon_tea',
            },
            {
              id: 2,

              label: '허니우롱티',
              value: 'sweetness_honeyed_honey_drink_honey_oolong_tea',
            },
            {
              id: 3,

              label: '허니라떼',
              value: 'sweetness_honeyed_honey_drink_honey_latte',
            },
            {
              id: 4,

              label: '허니주스',
              value: 'sweetness_honeyed_honey_drink_honey_juice',
            },
            {
              id: 5,

              label: '허니자몽티',
              value: 'sweetness_honeyed_honey_drink_honey_grapefruit_tea',
            },
          ],
        },
        {
          id: 5,

          label: '벌집·왁스',
          children: [
            {
              id: 1,

              label: '벌집꿀',
              value: 'sweetness_honeyed_comb_wax_honeycomb',
            },
            {
              id: 2,

              label: '비즈왁스',
              value: 'sweetness_honeyed_comb_wax_beeswax',
            },
            {
              id: 3,

              label: '꽃가루',
              value: 'sweetness_honeyed_comb_wax_bee_pollen',
            },
            {
              id: 4,

              label: '프로폴리스',
              value: 'sweetness_honeyed_comb_wax_propolis',
            },
            {
              id: 5,

              label: '로열젤리',
              value: 'sweetness_honeyed_comb_wax_royal_jelly',
            },
          ],
        },
      ],
    },
    {
      id: 4,

      label: '과일단맛',
      children: [
        {
          id: 1,

          label: '시트러스스위트',
          children: [
            {
              id: 1,

              label: '오렌지마멀레이드',
              value: 'sweetness_fruity_citrus_sweet_orange_marmalade',
            },
            {
              id: 2,

              label: '레몬커드',
              value: 'sweetness_fruity_citrus_sweet_lemon_curd',
            },
            {
              id: 3,

              label: '유자청',
              value: 'sweetness_fruity_citrus_sweet_yuja_marmalade',
            },
            {
              id: 4,

              label: '라임시럽',
              value: 'sweetness_fruity_citrus_sweet_lime_syrup',
            },
            {
              id: 5,

              label: '만다린캔디',
              value: 'sweetness_fruity_citrus_sweet_mandarin_candy',
            },
          ],
        },
        {
          id: 2,

          label: '베리스위트',
          children: [
            {
              id: 1,

              label: '딸기잼',
              value: 'sweetness_fruity_berry_sweet_strawberry_jam',
            },
            {
              id: 2,

              label: '라즈베리잼',
              value: 'sweetness_fruity_berry_sweet_raspberry_jam',
            },
            {
              id: 3,

              label: '블루베리시럽',
              value: 'sweetness_fruity_berry_sweet_blueberry_syrup',
            },
            {
              id: 4,

              label: '블랙베리콤포트',
              value: 'sweetness_fruity_berry_sweet_blackberry_compote',
            },
            {
              id: 5,

              label: '크랜베리소스',
              value: 'sweetness_fruity_berry_sweet_cranberry_sauce',
            },
          ],
        },
        {
          id: 3,

          label: '트로피컬스위트',
          children: [
            {
              id: 1,

              label: '망고퓨레',
              value: 'sweetness_fruity_tropical_sweet_mango_puree',
            },
            {
              id: 2,

              label: '파인애플시럽',
              value: 'sweetness_fruity_tropical_sweet_pineapple_syrup',
            },
            {
              id: 3,

              label: '바나나칩스위트',
              value: 'sweetness_fruity_tropical_sweet_banana_chip_sweet',
            },
            {
              id: 4,

              label: '코코넛크림스위트',
              value: 'sweetness_fruity_tropical_sweet_coconut_cream_sweet',
            },
            {
              id: 5,

              label: '패션프루트시럽',
              value: 'sweetness_fruity_tropical_sweet_passionfruit_syrup',
            },
          ],
        },
        {
          id: 4,

          label: '스톤프루트스위트',
          children: [
            {
              id: 1,

              label: '복숭아시럽',
              value: 'sweetness_fruity_stonefruit_sweet_peach_syrup',
            },
            {
              id: 2,

              label: '살구잼',
              value: 'sweetness_fruity_stonefruit_sweet_apricot_jam',
            },
            {
              id: 3,

              label: '자두콤포트',
              value: 'sweetness_fruity_stonefruit_sweet_plum_compote',
            },
            {
              id: 4,

              label: '체리시럽',
              value: 'sweetness_fruity_stonefruit_sweet_cherry_syrup',
            },
            {
              id: 5,

              label: '넥타린퓨레',
              value: 'sweetness_fruity_stonefruit_sweet_nectarine_puree',
            },
          ],
        },
        {
          id: 5,

          label: '건과일스위트',
          children: [
            {
              id: 1,

              label: '건포도',
              value: 'sweetness_fruity_driedfruit_sweet_raisin',
            },
            {
              id: 2,

              label: '말린살구',
              value: 'sweetness_fruity_driedfruit_sweet_dried_apricot',
            },
            {
              id: 3,

              label: '무화과',
              value: 'sweetness_fruity_driedfruit_sweet_fig',
            },
            {
              id: 4,

              label: '대추',
              value: 'sweetness_fruity_driedfruit_sweet_jujube',
            },
            {
              id: 5,

              label: '대추야자시럽',
              value: 'sweetness_fruity_driedfruit_sweet_date_syrup',
            },
          ],
        },
      ],
    },
    {
      id: 5,

      label: '디저트',
      children: [
        {
          id: 1,

          label: '크림·커스터드',
          children: [
            {
              id: 1,

              label: '바닐라크림',
              value: 'sweetness_confectionery_cream_custard_vanilla_cream',
            },
            {
              id: 2,

              label: '커스터드',
              value: 'sweetness_confectionery_cream_custard_custard',
            },
            {
              id: 3,

              label: '휘핑크림',
              value: 'sweetness_confectionery_cream_custard_whipped_cream',
            },
            {
              id: 4,

              label: '크렘앙글레즈',
              value: 'sweetness_confectionery_cream_custard_creme_anglaise',
            },
            {
              id: 5,

              label: '파나코타',
              value: 'sweetness_confectionery_cream_custard_panna_cotta',
            },
          ],
        },
        {
          id: 2,

          label: '베이커리',
          children: [
            {
              id: 1,

              label: '스폰지케이크',
              value: 'sweetness_confectionery_bakery_sponge_cake',
            },
            {
              id: 2,

              label: '쇼트브레드',
              value: 'sweetness_confectionery_bakery_shortbread',
            },
            {
              id: 3,

              label: '브리오슈',
              value: 'sweetness_confectionery_bakery_brioche',
            },
            {
              id: 4,

              label: '도넛글레이즈',
              value: 'sweetness_confectionery_bakery_donut_glaze',
            },
            {
              id: 5,

              label: '바닐라빈케이크',
              value: 'sweetness_confectionery_bakery_vanilla_bean_cake',
            },
          ],
        },
        {
          id: 3,

          label: '초콜릿류',
          children: [
            {
              id: 1,

              label: '밀크초콜릿',
              value: 'sweetness_confectionery_chocolate_sweet_milk_chocolate',
            },
            {
              id: 2,

              label: '화이트초콜릿',
              value: 'sweetness_confectionery_chocolate_sweet_white_chocolate',
            },
            {
              id: 3,

              label: '헤이즐넛스프레드',
              value: 'sweetness_confectionery_chocolate_sweet_hazelnut_spread',
            },
            {
              id: 4,

              label: '코코아',
              value: 'sweetness_confectionery_chocolate_sweet_cocoa',
            },
            {
              id: 5,

              label: '카라멜초콜릿',
              value: 'sweetness_confectionery_chocolate_sweet_caramel_chocolate',
            },
          ],
        },
        {
          id: 4,

          label: '설탕과자',
          children: [
            {
              id: 1,

              label: '터키시딜라이트',
              value: 'sweetness_confectionery_sugar_confection_turkish_delight',
            },
            {
              id: 2,

              label: '프랄린',
              value: 'sweetness_confectionery_sugar_confection_praline',
            },
            {
              id: 3,

              label: '브리틀',
              value: 'sweetness_confectionery_sugar_confection_brittle',
            },
            {
              id: 4,

              label: '캔디드넛',
              value: 'sweetness_confectionery_sugar_confection_candied_nut',
            },
            {
              id: 5,

              label: '누가',
              value: 'sweetness_confectionery_sugar_confection_nougat',
            },
          ],
        },
        {
          id: 5,

          label: '시럽·토핑',
          children: [
            {
              id: 1,

              label: '메이플시럽',
              value: 'sweetness_confectionery_syrup_topping_maple_syrup',
            },
            {
              id: 2,

              label: '초콜릿시럽',
              value: 'sweetness_confectionery_syrup_topping_chocolate_syrup',
            },
            {
              id: 3,

              label: '바닐라시럽',
              value: 'sweetness_confectionery_syrup_topping_vanilla_syrup',
            },
            {
              id: 4,

              label: '스트로베리소스',
              value: 'sweetness_confectionery_syrup_topping_strawberry_sauce',
            },
            {
              id: 5,

              label: '헤이즐넛시럽',
              value: 'sweetness_confectionery_syrup_topping_hazelnut_syrup',
            },
          ],
        },
      ],
    },
  ],
  mouthfeel: [
    {
      id: 1,

      label: '질감',
      children: [
        {
          id: 1,

          label: '라이트',
          children: [
            {
              id: 1,

              label: '얇은',
              value: 'mouthfeel_texture_light_thin',
            },
            {
              id: 2,

              label: '가벼운',
              value: 'mouthfeel_texture_light_delicate',
            },
            {
              id: 3,

              label: '부드러운',
              value: 'mouthfeel_texture_light_soft',
            },
            {
              id: 4,

              label: '산뜻한',
              value: 'mouthfeel_texture_light_refreshing',
            },
            {
              id: 5,

              label: '맑은',
              value: 'mouthfeel_texture_light_clear',
            },
          ],
        },
        {
          id: 2,

          label: '미디엄',
          children: [
            {
              id: 1,

              label: '균형잡힌',
              value: 'mouthfeel_texture_medium_balanced',
            },
            {
              id: 2,

              label: '라운디드',
              value: 'mouthfeel_texture_medium_rounded',
            },
            {
              id: 3,

              label: '탄탄한',
              value: 'mouthfeel_texture_medium_firm',
            },
            {
              id: 4,

              label: '매끄러운',
              value: 'mouthfeel_texture_medium_smooth',
            },
            {
              id: 5,

              label: '적당한',
              value: 'mouthfeel_texture_medium_moderate',
            },
          ],
        },
        {
          id: 3,

          label: '풀',
          children: [
            {
              id: 1,

              label: '묵직한',
              value: 'mouthfeel_texture_full_heavy',
            },
            {
              id: 2,

              label: '시럽같은',
              value: 'mouthfeel_texture_full_syrupy',
            },
            {
              id: 3,

              label: '점성있는',
              value: 'mouthfeel_texture_full_viscous',
            },
            {
              id: 4,

              label: '오일리한',
              value: 'mouthfeel_texture_full_oily',
            },
            {
              id: 5,

              label: '버터리한',
              value: 'mouthfeel_texture_full_buttery',
            },
          ],
        },
        {
          id: 4,

          label: '크리미',
          children: [
            {
              id: 1,

              label: '밀크같은',
              value: 'mouthfeel_texture_creamy_milky',
            },
            {
              id: 2,

              label: '벨벳같은',
              value: 'mouthfeel_texture_creamy_velvety',
            },
            {
              id: 3,

              label: '실키한',
              value: 'mouthfeel_texture_creamy_silky',
            },
            {
              id: 4,

              label: '부드러운',
              value: 'mouthfeel_texture_creamy_gentle',
            },
            {
              id: 5,

              label: '농밀한',
              value: 'mouthfeel_texture_creamy_dense',
            },
          ],
        },
        {
          id: 5,

          label: '거친',
          children: [
            {
              id: 1,

              label: '거칠은',
              value: 'mouthfeel_texture_rough_coarse',
            },
            {
              id: 2,

              label: '거품성',
              value: 'mouthfeel_texture_rough_foamy',
            },
            {
              id: 3,

              label: '모래알같은',
              value: 'mouthfeel_texture_rough_grainy',
            },
            {
              id: 4,

              label: '거친산미',
              value: 'mouthfeel_texture_rough_harsh_acid',
            },
            {
              id: 5,

              label: '울퉁불퉁한',
              value: 'mouthfeel_texture_rough_rugged',
            },
          ],
        },
      ],
    },
    {
      id: 2,

      label: '밀도감',
      children: [
        {
          id: 1,

          label: '얇은밀도',
          children: [
            {
              id: 1,

              label: '희석된',
              value: 'mouthfeel_density_thin_density_diluted',
            },
            {
              id: 2,

              label: '가벼운',
              value: 'mouthfeel_density_thin_density_light_body',
            },
            {
              id: 3,

              label: '밋밋한',
              value: 'mouthfeel_density_thin_density_flat',
            },
            {
              id: 4,

              label: '단순한',
              value: 'mouthfeel_density_thin_density_simple',
            },
            {
              id: 5,

              label: '산뜻한',
              value: 'mouthfeel_density_thin_density_clean',
            },
          ],
        },
        {
          id: 2,

          label: '중간밀도',
          children: [
            {
              id: 1,

              label: '균형잡힌',
              value: 'mouthfeel_density_medium_density_balanced_body',
            },
            {
              id: 2,

              label: '탄탄한',
              value: 'mouthfeel_density_medium_density_solid',
            },
            {
              id: 3,

              label: '풍부한',
              value: 'mouthfeel_density_medium_density_rich',
            },
            {
              id: 4,

              label: '조화로운',
              value: 'mouthfeel_density_medium_density_harmonious',
            },
            {
              id: 5,

              label: '적당히점성있는',
              value: 'mouthfeel_density_medium_density_moderately_viscous',
            },
          ],
        },
        {
          id: 3,

          label: '높은밀도',
          children: [
            {
              id: 1,

              label: '묵직한',
              value: 'mouthfeel_density_high_density_heavy_body',
            },
            {
              id: 2,

              label: '점성높은',
              value: 'mouthfeel_density_high_density_high_viscosity',
            },
            {
              id: 3,

              label: '리치한',
              value: 'mouthfeel_density_high_density_rich_texture',
            },
            {
              id: 4,

              label: '진득한',
              value: 'mouthfeel_density_high_density_thick',
            },
            {
              id: 5,

              label: '포화감있는',
              value: 'mouthfeel_density_high_density_saturated',
            },
          ],
        },
        {
          id: 4,

          label: '점성',
          children: [
            {
              id: 1,

              label: '시럽같은',
              value: 'mouthfeel_density_viscosity_syrupy',
            },
            {
              id: 2,

              label: '오일리한',
              value: 'mouthfeel_density_viscosity_oily',
            },
            {
              id: 3,

              label: '끈적한',
              value: 'mouthfeel_density_viscosity_sticky',
            },
            {
              id: 4,

              label: '농후한',
              value: 'mouthfeel_density_viscosity_dense_texture',
            },
            {
              id: 5,

              label: '점도가있는',
              value: 'mouthfeel_density_viscosity_viscous',
            },
          ],
        },
        {
          id: 5,

          label: '공기감',
          children: [
            {
              id: 1,

              label: '거품감있는',
              value: 'mouthfeel_density_airy_foamy_texture',
            },
            {
              id: 2,

              label: '가볍게부풀은',
              value: 'mouthfeel_density_airy_fluffy',
            },
            {
              id: 3,

              label: '통기성있는',
              value: 'mouthfeel_density_airy_airy',
            },
            {
              id: 4,

              label: '산뜻한',
              value: 'mouthfeel_density_airy_fresh',
            },
            {
              id: 5,

              label: '깨끗한',
              value: 'mouthfeel_density_airy_clear_mouthfeel',
            },
          ],
        },
      ],
    },
    {
      id: 3,

      label: '잔류감',
      children: [
        {
          id: 1,

          label: '클린',
          children: [
            {
              id: 1,

              label: '깔끔한',
              value: 'mouthfeel_afterfeel_clean_finish_clean',
            },
            {
              id: 2,

              label: '짧은여운',
              value: 'mouthfeel_afterfeel_clean_finish_short_finish',
            },
            {
              id: 3,

              label: '상쾌한',
              value: 'mouthfeel_afterfeel_clean_finish_refreshing',
            },
            {
              id: 4,

              label: '맑은',
              value: 'mouthfeel_afterfeel_clean_finish_transparent',
            },
            {
              id: 5,

              label: '밝은',
              value: 'mouthfeel_afterfeel_clean_finish_bright',
            },
          ],
        },
        {
          id: 2,

          label: '롱피니시',
          children: [
            {
              id: 1,

              label: '지속적인',
              value: 'mouthfeel_afterfeel_long_finish_lingering',
            },
            {
              id: 2,

              label: '풍부한여운',
              value: 'mouthfeel_afterfeel_long_finish_long_aftertaste',
            },
            {
              id: 3,

              label: '감칠맛있는',
              value: 'mouthfeel_afterfeel_long_finish_umami_finish',
            },
            {
              id: 4,

              label: '깊은',
              value: 'mouthfeel_afterfeel_long_finish_deep',
            },
            {
              id: 5,

              label: '잔잔한',
              value: 'mouthfeel_afterfeel_long_finish_gentle_finish',
            },
          ],
        },
        {
          id: 3,

          label: '드라이',
          children: [
            {
              id: 1,

              label: '드라이한',
              value: 'mouthfeel_afterfeel_dry_finish_dry',
            },
            {
              id: 2,

              label: '약간수축되는',
              value: 'mouthfeel_afterfeel_dry_finish_astringent',
            },
            {
              id: 3,

              label: '타닌감',
              value: 'mouthfeel_afterfeel_dry_finish_tannic',
            },
            {
              id: 4,

              label: '바삭한',
              value: 'mouthfeel_afterfeel_dry_finish_crisp_finish',
            },
            {
              id: 5,

              label: '깨끗하게끝남',
              value: 'mouthfeel_afterfeel_dry_finish_clean_end',
            },
          ],
        },
        {
          id: 4,

          label: '스위트피니시',
          children: [
            {
              id: 1,

              label: '은은한단맛',
              value: 'mouthfeel_afterfeel_sweet_finish_subtle_sweet',
            },
            {
              id: 2,

              label: '꿀여운',
              value: 'mouthfeel_afterfeel_sweet_finish_honey_aftertaste',
            },
            {
              id: 3,

              label: '부드러운끝',
              value: 'mouthfeel_afterfeel_sweet_finish_soft_finish',
            },
            {
              id: 4,

              label: '둥근여운',
              value: 'mouthfeel_afterfeel_sweet_finish_rounded_finish',
            },
            {
              id: 5,

              label: '균형잡힌여운',
              value: 'mouthfeel_afterfeel_sweet_finish_balanced_finish',
            },
          ],
        },
        {
          id: 5,

          label: '쓴여운',
          children: [
            {
              id: 1,

              label: '가벼운쓴미',
              value: 'mouthfeel_afterfeel_bitter_finish_light_bitter',
            },
            {
              id: 2,

              label: '허벌한잔류',
              value: 'mouthfeel_afterfeel_bitter_finish_herbal_finish',
            },
            {
              id: 3,

              label: '로스티드감',
              value: 'mouthfeel_afterfeel_bitter_finish_roasted_finish',
            },
            {
              id: 4,

              label: '초콜릿여운',
              value: 'mouthfeel_afterfeel_bitter_finish_choco_finish',
            },
            {
              id: 5,

              label: '홉느낌',
              value: 'mouthfeel_afterfeel_bitter_finish_hop_like',
            },
          ],
        },
      ],
    },
    {
      id: 4,

      label: '온도감',
      children: [
        {
          id: 1,

          label: '따뜻한',
          children: [
            {
              id: 1,

              label: '부드러운온기',
              value: 'mouthfeel_temperature_warm_gentle_warmth',
            },
            {
              id: 2,

              label: '은은한따뜻함',
              value: 'mouthfeel_temperature_warm_mild_heat',
            },
            {
              id: 3,

              label: '편안한',
              value: 'mouthfeel_temperature_warm_comforting',
            },
            {
              id: 4,

              label: '균형있는온기',
              value: 'mouthfeel_temperature_warm_balanced_heat',
            },
            {
              id: 5,

              label: '따뜻한입감',
              value: 'mouthfeel_temperature_warm_warm_body',
            },
          ],
        },
        {
          id: 2,

          label: '뜨거운',
          children: [
            {
              id: 1,

              label: '강한열감',
              value: 'mouthfeel_temperature_hot_strong_heat',
            },
            {
              id: 2,

              label: '입안자극',
              value: 'mouthfeel_temperature_hot_mouth_burn',
            },
            {
              id: 3,

              label: '매운온도감',
              value: 'mouthfeel_temperature_hot_spicy_heat',
            },
            {
              id: 4,

              label: '알코올감',
              value: 'mouthfeel_temperature_hot_alcohol_heat',
            },
            {
              id: 5,

              label: '강렬한온도감',
              value: 'mouthfeel_temperature_hot_intense_heat',
            },
          ],
        },
        {
          id: 3,

          label: '차가운',
          children: [
            {
              id: 1,

              label: '시원한',
              value: 'mouthfeel_temperature_cold_cool',
            },
            {
              id: 2,

              label: '멘톨감',
              value: 'mouthfeel_temperature_cold_menthol',
            },
            {
              id: 3,

              label: '프레시',
              value: 'mouthfeel_temperature_cold_fresh',
            },
            {
              id: 4,

              label: '클린쿨링',
              value: 'mouthfeel_temperature_cold_clean_cooling',
            },
            {
              id: 5,

              label: '얼음느낌',
              value: 'mouthfeel_temperature_cold_icy',
            },
          ],
        },
        {
          id: 4,

          label: '미묘한온도',
          children: [
            {
              id: 1,

              label: '미세한온기',
              value: 'mouthfeel_temperature_subtle_temp_faint_warm',
            },
            {
              id: 2,

              label: '약한쿨링',
              value: 'mouthfeel_temperature_subtle_temp_mild_cool',
            },
            {
              id: 3,

              label: '중립적',
              value: 'mouthfeel_temperature_subtle_temp_neutral',
            },
            {
              id: 4,

              label: '안정된',
              value: 'mouthfeel_temperature_subtle_temp_stable',
            },
            {
              id: 5,

              label: '균형된온도감',
              value: 'mouthfeel_temperature_subtle_temp_balanced_temp',
            },
          ],
        },
        {
          id: 5,

          label: '열-쿨 밸런스',
          children: [
            {
              id: 1,

              label: '균형있는',
              value: 'mouthfeel_temperature_thermal_balance_balanced',
            },
            {
              id: 2,

              label: '동시감각',
              value: 'mouthfeel_temperature_thermal_balance_dual_sensation',
            },
            {
              id: 3,

              label: '복합감',
              value: 'mouthfeel_temperature_thermal_balance_complex_temp',
            },
            {
              id: 4,

              label: '조화로운',
              value: 'mouthfeel_temperature_thermal_balance_harmonious',
            },
            {
              id: 5,

              label: '미묘한온감',
              value: 'mouthfeel_temperature_thermal_balance_subtle_thermal',
            },
          ],
        },
      ],
    },
    {
      id: 5,

      label: '촉감',
      children: [
        {
          id: 1,

          label: '탄산감',
          children: [
            {
              id: 1,

              label: '미세기포',
              value: 'mouthfeel_tactile_carbonation_fine_bubble',
            },
            {
              id: 2,

              label: '중간기포',
              value: 'mouthfeel_tactile_carbonation_medium_bubble',
            },
            {
              id: 3,

              label: '거친기포',
              value: 'mouthfeel_tactile_carbonation_large_bubble',
            },
            {
              id: 4,

              label: '스파클링감',
              value: 'mouthfeel_tactile_carbonation_sparkling',
            },
            {
              id: 5,

              label: '톡쏘는',
              value: 'mouthfeel_tactile_carbonation_tingling',
            },
          ],
        },
        {
          id: 2,

          label: '수렴감',
          children: [
            {
              id: 1,

              label: '약한수렴감',
              value: 'mouthfeel_tactile_astringency_light_astringency',
            },
            {
              id: 2,

              label: '중간수렴감',
              value: 'mouthfeel_tactile_astringency_medium_astringency',
            },
            {
              id: 3,

              label: '강한수렴감',
              value: 'mouthfeel_tactile_astringency_strong_astringency',
            },
            {
              id: 4,

              label: '입안수축감',
              value: 'mouthfeel_tactile_astringency_mouth_contraction',
            },
            {
              id: 5,

              label: '드라이한촉감',
              value: 'mouthfeel_tactile_astringency_dry_tactile',
            },
          ],
        },
        {
          id: 3,

          label: '점착감',
          children: [
            {
              id: 1,

              label: '끈적한',
              value: 'mouthfeel_tactile_stickiness_sticky',
            },
            {
              id: 2,

              label: '약간점착',
              value: 'mouthfeel_tactile_stickiness_slightly_sticky',
            },
            {
              id: 3,

              label: '농밀한',
              value: 'mouthfeel_tactile_stickiness_dense_stick',
            },
            {
              id: 4,

              label: '부드럽게달라붙는',
              value: 'mouthfeel_tactile_stickiness_soft_cling',
            },
            {
              id: 5,

              label: '시럽성',
              value: 'mouthfeel_tactile_stickiness_syrupy_stick',
            },
          ],
        },
        {
          id: 4,

          label: '청량감',
          children: [
            {
              id: 1,

              label: '시원한감촉',
              value: 'mouthfeel_tactile_refreshing_tactile_cool_touch',
            },
            {
              id: 2,

              label: '멘톨감',
              value: 'mouthfeel_tactile_refreshing_tactile_menthol_touch',
            },
            {
              id: 3,

              label: '깨끗한촉감',
              value: 'mouthfeel_tactile_refreshing_tactile_clean_touch',
            },
            {
              id: 4,

              label: '산뜻한',
              value: 'mouthfeel_tactile_refreshing_tactile_fresh_tactile',
            },
            {
              id: 5,

              label: '가벼운쿨링',
              value: 'mouthfeel_tactile_refreshing_tactile_light_cooling',
            },
          ],
        },
        {
          id: 5,

          label: '거친촉감',
          children: [
            {
              id: 1,

              label: '거친',
              value: 'mouthfeel_tactile_rough_tactile_rough',
            },
            {
              id: 2,

              label: '분말감',
              value: 'mouthfeel_tactile_rough_tactile_powdery',
            },
            {
              id: 3,

              label: '모래감',
              value: 'mouthfeel_tactile_rough_tactile_gritty',
            },
            {
              id: 4,

              label: '입자감',
              value: 'mouthfeel_tactile_rough_tactile_grainy',
            },
            {
              id: 5,

              label: '두꺼운입자감',
              value: 'mouthfeel_tactile_rough_tactile_coarse_particle',
            },
          ],
        },
      ],
    },
  ],
};
